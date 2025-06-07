// src/components/StickerButton.js
import React from 'react';
import './index.css';

const StickerButton = ({ imageSrc, onClick }) => {
  return (
    <button className="sticker-button" onClick={onClick}>
      <img src={imageSrc} alt="sticker" width="40" height="40" />
    </button>
  );
};

export default StickerButton;
