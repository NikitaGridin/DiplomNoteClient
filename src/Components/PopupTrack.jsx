import React, { useRef, useEffect } from "react";

const PopupTrack = ({ onClose }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={popupRef}
      className="absolute top-0 right-0 bg-white py-5 px-5 shadow-xl rounded-lg text-center border"
    >
      <p className="">Добавить в плейлист</p>
    </div>
  );
};

export default PopupTrack;
