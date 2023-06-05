import React from "react";
import Albums from "../Components/Albums";

const AdminPanel = () => {
  return (
    <div className="mx-auto w-9/12">
      <Albums
        url={`admin/all`}
        author={false}
        title={"Заявки на публикацию альбомов"}
        hidden={false}
        forAdmin={true}
      />{" "}
    </div>
  );
};

export default AdminPanel;
