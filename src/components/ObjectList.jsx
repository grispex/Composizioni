import React, { useState } from "react";
import { objects } from "../data/objects";
import ObjectBox from "./ObjectBox";
import ObjectModal from "./ObjectModal";

const ObjectList = () => {
  const [openPopup, setOpenPopup] = useState(null);

  const handleBoxClick = (obj) => {
    setOpenPopup(openPopup?.id === obj.id ? null : obj);
  };

  const handleClose = () => {
    setOpenPopup(null);
  };

  const hasOpenPopup = openPopup !== null;
  const popupOpenId = openPopup?.id;

  return (
    <div className="object-list">
      {objects.filter(obj => obj.id !== 8).map((obj) => (
        <ObjectBox
          key={obj.id}
          object={obj}
          onClick={() => handleBoxClick(obj)}
          selected={popupOpenId === obj.id}
          popupOpen={popupOpenId === obj.id}
          hasOpenPopup={hasOpenPopup}
        />
      ))}
      {openPopup && (
        <ObjectModal
          object={openPopup}
          zIndex={2100}
          active={true}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ObjectList;
