import React from "react";

const Message = ({ bg, text }) => {
  return (
    <div
      className={`absolute top-10 left-0 right-0 mx-auto w-1/4 text-center ${bg} font-semibold text-white rounded-xl py-5`}
    >
      {text}
    </div>
  );
};

export default Message;
