import React from 'react';
import '../Popup.css';

const PopupComponent = ({ isOpen, content }) => {
  return isOpen ? (
    <div className="popup__container">
      <div className="popup__content">
        <ul className="popup__list">
          {content.map((el, i) => (
            <li key={i} className="popup__list-item">
              {el}
            </li>
          ))}
        </ul>
    </div>
    </div>
  ) : null;
};

export default PopupComponent;