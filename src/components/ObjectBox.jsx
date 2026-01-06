import React, { memo } from "react";

const ObjectBox = ({ object, onClick, selected, popupOpen, hasOpenPopup }) => (
  <div
    className={`object-box${selected ? " selected" : popupOpen ? " opened" : ""}${hasOpenPopup && !popupOpen ? " other-open" : ""}`}
    onClick={onClick}
    tabIndex={0}
    onMouseDown={e => e.preventDefault()}
  >
    <span className={`object-label${selected ? " selected" : popupOpen ? " opened" : ""}${hasOpenPopup && !popupOpen ? " other-open" : ""}`}>
      {object.name}
    </span>
  </div>
);

export default memo(ObjectBox);
