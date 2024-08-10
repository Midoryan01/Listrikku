import React, { useState } from "react";
import axios from "axios";

const ModalPembayaran = ({ isOpen, onClose, payment }) => {
  const [amountPaid, setAmountPaid] = useState(payment?.total_bayar || 0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (amountPaid <= 0) {
      alert("Jumlah pembayaran harus lebih besar dari 0");
      return;
    }

    setIsProcessing(true);
    try {
      await axios.put(`http://localhost:5000/prosesPembayaran`, {
        id_pembayaran: payment.id_pembayaran, // ID Pembayaran dikirim disini
        total_bayar: amountPaid,
      });
      onClose(); // Close modal setelah proses pembayaran berhasil
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`modal fade ${isOpen ? "show d-block" : ""}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pembayaran</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p><strong>ID Tagihan:</strong> {payment?.id_tagihan}</p>
            <p><strong>Total Bayar:</strong> Rp. {payment?.total_bayar},-</p>
            <div className="form-group">
              <label htmlFor="amountPaid">Jumlah Bayar</label>
              <input
                type="number"
                id="amountPaid"
                className="form-control"
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
                min="0"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Bayar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPembayaran;
