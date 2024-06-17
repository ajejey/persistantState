import React, { useState } from 'react';
import useDbState from '../../hooks/useDbState';

const ImageUpload = () => {
  const [image, setImage] = useDbState('uploadedImage', null);
  const [preview, setPreview] = useState(image);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <small>Preview</small>
      {preview && <img src={preview} alt="Preview" style={{ width: '300px', marginTop: '10px' }} />}
    </div>
  );
};

export default ImageUpload;
