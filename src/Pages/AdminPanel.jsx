import React from "react";
import Albums from "../Components/Albums";

const AdminPanel = () => {
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <Albums
        url={`admin/all`}
        author={false}
        title={"Заявки на публикацию альбомов"}
        hidden={false}
        forAdmin={true}
      />
    </div>
  );
};

export default AdminPanel;
