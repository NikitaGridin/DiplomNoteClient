import React from "react";

const Message = ({ bg, text }) => {
  return (
    <div
      className={`fixed top-10 left-0 right-0 mx-auto text-center ${bg} font-semibold text-white rounded-xl py-5 xl:w-1/4 z-50`}
    >
      {text}
    </div>
  );
};

export default Message;
