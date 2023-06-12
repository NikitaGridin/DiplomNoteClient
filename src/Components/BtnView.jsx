import React from "react";

const BtnView = ({ handleChangePart }) => {
  return (
    <div className="text-center">
      <button
        className="border border-[#8A8A8A] text-[#8A8A8A] text-lg py-4 rounded-xl inline-block w-full sm:w-1/2 lg:w-1/3 xl:w-1/6 xl:text-sm"
        onClick={handleChangePart}
      >
        Посмотреть ещё
      </button>
    </div>
  );
};

export default BtnView;
