import React from 'react';
import useDbState from '../../hooks/useDbState';

const DisplayImage = () => {
  const [image] = useDbState('uploadedImage', null);

  return (
    <div>
      <h4>DisplayImage</h4>
      {image ? (
        <img src={image} alt="Stored" style={{ width: '300px', marginTop: '10px' }} />
      ) : (
        <p>No image stored</p>
      )}
    </div>
  );
};

export default DisplayImage;
