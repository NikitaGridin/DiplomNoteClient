import React from "react";

const BtnView = ({ handleChangePart }) => {
  return (
    <div className="text-center">
      <button
        className="border border-[#8A8A8A] text-[#8A8A8A] text-sm py-3 px-4 rounded-xl inline-block"
        onClick={handleChangePart}
      >
        Посмотреть ещё
      </button>
    </div>
  );
};

export default BtnView;
