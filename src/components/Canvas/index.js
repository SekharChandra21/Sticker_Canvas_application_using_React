
import React from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const Sticker = ({ sticker, onDragEnd, onDblClick }) => {
  const [image] = useImage(sticker.image);
  return (
    <KonvaImage
      image={image}
      x={sticker.x}
      y={sticker.y}
      width={50}
      height={50}
      draggable
      onDragEnd={(e) => onDragEnd(sticker.id, e.target.x(), e.target.y())}
      onDblClick={() => onDblClick(sticker.id)}
    />
  );
};

const Canvas = ({ stickers, onDragEnd, onDblClick, stageRef }) => {
  return (
    <Stage width={600} height={400} ref={stageRef} className="canvas-stage">
      <Layer>
        {stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            sticker={sticker}
            onDragEnd={onDragEnd}
            onDblClick={onDblClick}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
