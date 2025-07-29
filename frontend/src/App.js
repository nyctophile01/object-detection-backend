import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [detections, setDetections] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await axios.post('http://127.0.0.1:5000/detect', formData);
    setDetections(res.data.detections);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Object Detection</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setImageURL(URL.createObjectURL(e.target.files[0]));
        }}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Detect
      </button>

      <div className="relative">
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            className="rounded max-w-full border"
            id="uploaded-img"
          />
        )}
        {imageURL &&
          detections.map((det, index) => {
            const box = det.box;
            return (
              <div
                key={index}
                className="absolute border-2 border-red-500"
                style={{
                  left: box.x1,
                  top: box.y1,
                  width: box.x2 - box.x1,
                  height: box.y2 - box.y1,
                }}
              >
                <span className="bg-red-600 text-white text-xs px-1 absolute">
                  {det.label}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
