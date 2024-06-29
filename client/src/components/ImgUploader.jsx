import React, { useState } from 'react';

function ImgUploader({ imgToSend, pathToImg, onImgChange }) {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    onImgChange(file);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl cursor-pointer" onClick={() => document.getElementById(pathToImg).click()}>
      <input
        id={pathToImg}
        type="file"
        onChange={handleImageChange}
        className="hidden"
      />
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" className="h-12 w-12 rounded-xl" />
      ) : (
        <div className="h-12 w-12 bg-gray-300 rounded-xl"></div>
      )}
    </div>
  );
}

export default ImgUploader;