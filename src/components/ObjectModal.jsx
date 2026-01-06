import React, { memo } from "react";
import ThreeDViewer from "./ThreeDViewer";

const ObjectModal = ({ object, zIndex = 2100, active = true, onClose }) => {
  const overlayRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      // Chiudi se il click è fuori dal modal
      if (overlayRef.current && !overlayRef.current.querySelector('.fixed-modal').contains(e.target)) {
        // Verifica che il click non sia su un box
        const clickedBox = e.target.closest('.object-box');
        if (!clickedBox) {
          onClose?.();
        }
      }
    };

    // Aggiungi listener solo quando il modal è aperto
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" ref={overlayRef} style={{ zIndex }}>
      <div className="modal-content fixed-modal">
        <div className="modal-header">
        </div>
        <div className="modal-body">
          <ThreeDViewer glbPath={object.glbPath} active={active} />
        </div>
      </div>
    </div>
  );
};

export default memo(ObjectModal);
