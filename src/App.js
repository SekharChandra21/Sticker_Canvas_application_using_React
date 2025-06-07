// src/App.js
import React, { useState, useRef } from 'react';
import Canvas from './components/Canvas';
import StickerButton from './components/StickerButton';
import './App.css';

const STICKERS = [
  { id: '1', src: '/stickers/sticker1.png' },
  { id: '2', src: '/stickers/sticker2.png' },
  { id: '3', src: '/stickers/sticker3.png' },
];

function App() {
  const [stickers, setStickers] = useState([]);
  const stageRef = useRef();

  const addSticker = (src) => {
    const snappedX = Math.round(50 / 40) * 40;
    const snappedY = Math.round(50 / 40) * 40;
    const newSticker = {
      id: Date.now().toString(),
      image: src,
      x: snappedX,
      y: snappedY,
    };
    setStickers([...stickers, newSticker]);
  };

  const updateStickerPosition = (id, x, y) => {
    const snappedX = Math.round(x / 40) * 40;
    const snappedY = Math.round(y / 40) * 40;
    setStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === id ? { ...sticker, x: snappedX, y: snappedY } : sticker
      )
    );
  };

  const deleteSticker = (id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {STICKERS.map((sticker) => (
          <StickerButton
            key={sticker.id}
            imageSrc={sticker.src}
            onClick={() => addSticker(sticker.src)}
          />
        ))}
        <button onClick={handleDownload} className="download-btn">
          Download
        </button>
      </div>
      <Canvas
        stickers={stickers}
        onDragEnd={updateStickerPosition}
        onDblClick={deleteSticker}
        stageRef={stageRef}
      />
    </div>
  );
}

export default App;
