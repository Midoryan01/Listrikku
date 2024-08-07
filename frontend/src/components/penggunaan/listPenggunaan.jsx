import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AddPenggunaan from "./addPenggunaan";
import DeleteConfirmationModal from "../deleteConfirmationModel";

const PenggunaanTable = () => {
  const [penggunaan, setPenggunaan] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPenggunaanId, setSelectedPenggunaanId] = useState(null);

  // Mendapatkan peran dan ID pengguna dari state Redux
  const { role, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responsePenggunaan = await axios.get('http://localhost:5000/penggunaan');
        console.log("Data Penggunaan:", responsePenggunaan.data); // Log data penggunaan
        if (Array.isArray(responsePenggunaan.data)) {
          setPenggunaan(responsePenggunaan.data);
        } else {
          throw new Error("Format data penggunaan tidak valid");
        }

        const responsePelanggan = await axios.get('http://localhost:5000/pelanggan');
        console.log("Data Pelanggan:", responsePelanggan.data); // Log data pelanggan
        if (Array.isArray(responsePelanggan.data)) {
          setPelanggan(responsePelanggan.data);
        } else {
          throw new Error("Format data pelanggan tidak valid");
        }
      } catch (error) {
        setIsError(true);
        console.error("Error mengambil data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredPenggunaan = penggunaan.filter((item) =>
    item.bulan.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Memfilter data penggunaan berdasarkan peran pengguna
  const visiblePenggunaan = role === 'admin'
    ? filteredPenggunaan
    : filteredPenggunaan.filter(item => item.id_pelanggan === user?.id_pelanggan);

  const getPelangganName = (id_pelanggan) => {
    const pelangganData = pelanggan.find(p => p.id_pelanggan === id_pelanggan);
    return pelangganData ? pelangganData.nama_pelanggan : "N/A";
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    setSelectedPenggunaanId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPenggunaanId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/penggunaan/${selectedPenggunaanId}`);
      setPenggunaan(penggunaan.filter((item) => item.id_penggunaan !== selectedPenggunaanId));
      setIsDeleteModalOpen(false);
      setSelectedPenggunaanId(null);
    } catch (error) {
      console.error("Error menghapus data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error mengambil data</div>;
  }

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h4 className="m-0 font-weight-bold text-primary">Data Penggunaan Listrik</h4>
          {role === 'admin' && (
            <button className="btn btn-primary" onClick={handleAddClick}>Tambah Data</button>
          )}
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Cari berdasarkan bulan"
                value={searchKeyword}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nama Pelanggan</th>
                  <th>Bulan</th>
                  <th>Tahun</th>
                  <th>Meter Awal</th>
                  <th>Meter Akhir</th>
                  {role === 'admin' && <th>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {visiblePenggunaan.length > 0 ? (
                  visiblePenggunaan.map((item, index) => (
                    <tr key={item.id_penggunaan}>
                      <td>{index + 1}</td>
                      <td>{getPelangganName(item.id_pelanggan)}</td>
                      <td>{item.bulan}</td>
                      <td>{item.tahun}</td>
                      <td>{item.meter_awal} kWh</td>
                      <td>{item.meter_akhir} kWh</td>
                      {role === 'admin' && (
                        <td>
                          <button className="btn btn-primary btn-sm mr-2">Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(item.id_penggunaan)}>Hapus</button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Tidak Ada Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <AddPenggunaan isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
      )}
      {isDeleteModalOpen && selectedPenggunaanId && (
        <DeleteConfirmationModal onClose={handleCloseDeleteModal} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default PenggunaanTable;
