import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPenggunaan = ({ isOpen, onClose }) => {
  const [idPelanggan, setIdPelanggan] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [meterAwal, setMeterAwal] = useState("");
  const [meterAkhir, setMeterAkhir] = useState("");
  const [pelanggan, setPelanggan] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    const fetchPelanggan = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pelanggan');
        setPelanggan(response.data);
      } catch (error) {
        console.error("Error fetching pelanggan data:", error);
      }
    };

    if (isOpen) {
      fetchPelanggan();
      setSuccessMessage(""); // Reset success message when modal opens
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/penggunaan', {
        id_pelanggan: idPelanggan,
        bulan,
        tahun,
        meter_awal: meterAwal,
        meter_akhir: meterAkhir,
      });
      setSuccessMessage("Data berhasil ditambahkan!");
      setTimeout(onClose, 2000); // Close modal after 2 seconds
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tambah Data Penggunaan</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>ID Pelanggan</label>
                <select
                  className="form-control"
                  value={idPelanggan}
                  onChange={(e) => setIdPelanggan(e.target.value)}
                  required
                >
                  <option value="">Pilih ID Pelanggan</option>
                  {pelanggan.map((p) => (
                    <option key={p.id_pelanggan} value={p.id_pelanggan}>
                      {p.id_pelanggan} - {p.nama_pelanggan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Bulan</label>
                <input
                  type="text"
                  className="form-control"
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tahun</label>
                <input
                  type="text"
                  className="form-control"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Meter Awal</label>
                <input
                  type="text"
                  className="form-control"
                  value={meterAwal}
                  onChange={(e) => setMeterAwal(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Meter Akhir</label>
                <input
                  type="text"
                  className="form-control"
                  value={meterAkhir}
                  onChange={(e) => setMeterAkhir(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPenggunaan;
