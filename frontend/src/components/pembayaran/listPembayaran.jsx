import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalPembayaran from "./ModalPembayaran";

const ListPembayaran = () => {
  const [payments, setPayments] = useState([]);
  const [pelanggans, setPelanggans] = useState([]);
  const [searchMonth, setSearchMonth] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPaymentForPay, setSelectedPaymentForPay] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);

  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responsePayments = await axios.get("http://localhost:5000/pembayaran");
        setPayments(Array.isArray(responsePayments.data) ? responsePayments.data : []);
        const responsePelanggans = await axios.get("http://localhost:5000/pelanggan");
        setPelanggans(Array.isArray(responsePelanggans.data) ? responsePelanggans.data : []);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchMonth = (e) => setSearchMonth(e.target.value);
  const handleSearchYear = (e) => setSearchYear(e.target.value);

  const filteredPayments = payments.filter((payment) => {
    const paymentDate = payment.tanggal_pembayaran;
    if (!paymentDate) return true; // Tampilkan semua jika tanggal pembayaran kosong
    return paymentDate.includes(`${searchYear}-${searchMonth}`);
  });

  const getNamaPelanggan = (id_pelanggan) => {
    const pelanggan = pelanggans.find((p) => p.id_pelanggan === id_pelanggan);
    return pelanggan ? pelanggan.nama_pelanggan : "Tidak Diketahui";
  };

  const handleAddClick = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleDeleteClick = (payment) => {
    setSelectedPayment(payment);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPayment(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/pembayaran/${selectedPayment.id_pembayaran}`);
      setPayments(payments.filter((payment) => payment.id_pembayaran !== selectedPayment.id_pembayaran));
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handlePayClick = (payment) => {
    setSelectedPaymentForPay(payment);
    setIsPayModalOpen(true);
  };

  const handleClosePayModal = () => {
    setIsPayModalOpen(false);
    setSelectedPaymentForPay(null);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`http://localhost:5000/prosesPembayaran`, {
        id_pembayaran: selectedPaymentForPay.id_pembayaran,
        total_bayar: amountPaid,
      });
      handleClosePayModal(); // Close modal setelah pembayaran berhasil
      
      // Refresh data pembayaran setelah pembayaran berhasil
      const response = await axios.get("http://localhost:5000/pembayaran");
      setPayments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const visiblePembayaran =
    role === "admin"
      ? filteredPayments
      : filteredPayments.filter((item) => item.id_pelanggan === user?.id_pelanggan);

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h4 className="m-0 font-weight-bold text-primary">
            Data Pembayaran Listrik
          </h4>
          {role === "admin" && (
            <button className="btn btn-primary" onClick={handleAddClick}>
              Tambah Data
            </button>
          )}
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search by month (MM)"
                value={searchMonth}
                onChange={handleSearchMonth}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search by year (YYYY)"
                value={searchYear}
                onChange={handleSearchYear}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>No.</th>
                  {role === "admin" && <th>ID Tagihan</th>}
                  <th>Nama Pelanggan</th>
                  <th>Tanggal Pembayaran</th>
                  <th>Bulan Bayar</th>
                  <th>Biaya Admin</th>
                  <th>Total Bayar</th>
                  {role === "admin" && <th>ID User</th>}
                  {role === "admin" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {visiblePembayaran.length > 0 ? (
                  visiblePembayaran.map((payment, index) => (
                    <tr key={payment.id_pembayaran}>
                      <td>{index + 1}</td>
                      {role === "admin" && (
                        <>
                          <td>{payment.id_tagihan}</td>
                          <td>{payment.id_user}</td>
                        </>
                      )}
                      <td>{getNamaPelanggan(payment.id_pelanggan)}</td>
                      <td>
                        {payment.tanggal_pembayaran
                          ? new Date(payment.tanggal_pembayaran).toLocaleDateString()
                          : "Belum Dibayar"}
                      </td>
                      <td>{payment.bulan_bayar || "Belum Dibayar"}</td>
                      <td>{payment.biaya_admin}</td>
                      <td>Rp. {payment.total_bayar},-</td>
                      <td>
                        {role === "pelanggan" && !payment.tanggal_pembayaran && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handlePayClick(payment)}
                          >
                            Bayar
                          </button>
                        )}
                        {role === "admin" && (
                          <>
                            <button className="btn btn-primary btn-sm mr-2">Edit</button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteClick(payment)}
                            >
                              Hapus
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={role === "admin" ? "9" : "8"} className="text-center">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddPembayaranModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onAdd={(newPayment) => setPayments([...payments, newPayment])}
        />
      )}

      {isDeleteModalOpen && selectedPayment && (
        <DeletePembayaranModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
          payment={selectedPayment}
        />
      )}

      {isPayModalOpen && selectedPaymentForPay && (
        <ModalPembayaran
          isOpen={isPayModalOpen}
          onClose={handleClosePayModal}
          onConfirm={handlePayment}
          onAmountChange={(e) => setAmountPaid(Number(e.target.value))}
          amountPaid={amountPaid}
          payment={selectedPaymentForPay}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default ListPembayaran;
