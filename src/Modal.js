import React from 'react';
import './Modal.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Error</h3>
        <p>{message}</p>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
