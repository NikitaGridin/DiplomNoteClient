import React, { useRef, useEffect } from 'react';

const PopupTrack = ({ onClose }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={popupRef}
      className='absolute top-0 right-0 bg-white py-5 px-5 shadow-lg rounded-lg text-center'>
      <p className='mb-3'>Добавить в очередь</p>
      <p className='mb-3'>Добавить в плейлист</p>
      <p className='mb-3'>Поделится</p>
    </div>
  );
};

export default PopupTrack;