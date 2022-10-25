import "./modal.css";

function Modal({ open, modalLabel, children, customModal, onClose }) {
  const handleClose = (e) => {
    if (e.target.className === "modal-container") {
      onClose();
    }
    return null;
  };

  if (open) {
    return (
      <div className='modal-container' onClick={handleClose}>
        <section className={`modal index ${customModal}`}>
          <div className='modal-head'>
            <h2>{modalLabel}</h2>
            <span className='modal-close' onClick={onClose}>
              x
            </span>
          </div>
          {children}
        </section>
      </div>
    );
  }
  return null;
}

export default Modal;
