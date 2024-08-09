import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TagihanTable = () => {
  const [tagihan, setTagihan] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTagihanId, setSelectedTagihanId] = useState(null);
  const [selectedTagihanData, setSelectedTagihanData] = useState(null);

  const { role, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTagihan = async () => {
      setIsLoading(true);
      try {

        const response = await axios.get(
          `http://localhost:5000/tagihan`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setTagihan(response.data);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching tagihan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id_pelanggan) {
      fetchTagihan();
    }
  }, [user]);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredTagihan = tagihan.filter((item) =>
    item.bulan?.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleEditClick = (data) => {
    setSelectedTagihanData(data);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTagihanData(null);
  };

  const handleDeleteClick = (id) => {
    setSelectedTagihanId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTagihanId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tagihan/${selectedTagihanId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setTagihan(tagihan.filter((item) => item.id_tagihan !== selectedTagihanId));
      setIsDeleteModalOpen(false);
      setSelectedTagihanId(null);
    } catch (error) {
      console.error("Error deleting tagihan:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching tagihan</div>;
  }

  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h4 className="m-0 font-weight-bold text-primary">Data Tagihan Listrik</h4>
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
                  <th>ID Tagihan</th>
                  <th>ID Penggunaan</th>
                  <th>Nama Pelanggan</th>
                  <th>Bulan</th>
                  <th>Tahun</th>
                  <th>Meter Awal</th>
                  <th>Meter Akhir</th>
                  {role === "admin" && <th>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {filteredTagihan.length > 0 ? (
                  filteredTagihan.map((item, index) => (
                    <tr key={item.id_tagihan}>
                      <td>{index + 1}</td>
                      <td>{item.id_tagihan}</td>
                      <td>{item.id_penggunaan}</td>
                      <td>{user?.nama_pelanggan || "N/A"}</td>
                      <td>{item.bulan}</td>
                      <td>{item.tahun}</td>
                      <td>{item.jumlah_meter} kWh</td>
                      <td>{item.status}</td>
                      {role === "admin" && (
                        <td>
                          <button
                            className="btn btn-primary btn-sm mr-2"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteClick(item.id_tagihan)}
                          >
                            Hapus
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={role === "admin" ? 9 : 8} className="text-center">
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
        <AddTagihan isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
      )}
      {isEditModalOpen && selectedTagihanData && (
        <EditTagihan
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          data={selectedTagihanData}
        />
      )}
      {isDeleteModalOpen && selectedTagihanId && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default TagihanTable;
