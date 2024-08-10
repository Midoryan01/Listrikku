import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TagihanTable = () => {
  const [tagihan, setTagihan] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [editingTagihan, setEditingTagihan] = useState(null);

  // Mendapatkan peran pengguna dari state Redux
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseTagihan = await axios.get('http://localhost:5000/alltagihan');
        if (Array.isArray(responseTagihan.data)) {
          setTagihan(responseTagihan.data);
        } else {
          throw new Error("Invalid data format for tagihan");
        }

        const responsePelanggan = await axios.get('http://localhost:5000/pelanggan');
        if (Array.isArray(responsePelanggan.data)) {
          setPelanggan(responsePelanggan.data);
        } else {
          throw new Error("Invalid data format for pelanggan");
        }
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredTagihan = tagihan.filter((item) =>
    item.bulan.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const getNamaPelanggan = (id_pelanggan) => {
    const pelangganData = pelanggan.find((pel) => pel.id_pelanggan === id_pelanggan);
    return pelangganData ? pelangganData.nama_pelanggan : "N/A";
  };

  const handleEdit = (tagihan) => {
    setEditingTagihan(tagihan);
  };

  const handleUpdate = (id_tagihan, status) => {
    setTagihan((prevTagihan) =>
      prevTagihan.map((item) =>
        item.id_tagihan === id_tagihan ? { ...item, status } : item
      )
    );
  };

  const handleCloseModal = () => {
    setEditingTagihan(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Tampilkan data tagihan hanya untuk pelanggan terkait atau admin
  const visibleTagihan = role === "admin"
    ? filteredTagihan
    : filteredTagihan.filter((item) => item.id_pelanggan === user?.id_pelanggan);

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">Data Tagihan Listrik</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search by bulan"
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
                  <th>Jumlah Meter</th>
                  <th>Status</th>
                  {role === "admin" && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {visibleTagihan.length > 0 ? (
                  visibleTagihan.map((item, index) => (
                    <tr key={item.id_tagihan || index}>
                      <td>{index + 1}</td>
                      <td>{getNamaPelanggan(item.id_pelanggan)}</td>
                      <td>{item.bulan}</td>
                      <td>{item.tahun}</td>
                      <td>{item.jumlah_meter}</td>
                      <td>{item.status}</td>
                      {role === "admin" && (
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={role === "admin" ? 7 : 6} className="text-center">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editingTagihan && (
        <EditStatusModal
          tagihan={editingTagihan}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default TagihanTable;
