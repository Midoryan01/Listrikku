import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutModal = ({ showModal, onClose, onLogout }) => {
  return (
    <div 
      className={`modal fade ${showModal ? 'show d-block' : ''}`} 
      id="logoutModal" 
      tabIndex="-1" 
      aria-labelledby="exampleModalLabel" 
      aria-hidden={!showModal}
      style={{ display: showModal ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Yakin Keluar?</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            Pilih "Logout" kalau ingin mengkakhiri ini.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
