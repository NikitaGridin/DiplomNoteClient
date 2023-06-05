import React from "react";
import { observer } from "mobx-react-lite";
import Authors from "../Components/Authors";

const AllAuthors = observer(() => {
  return (
    <div className="w-9/12 mx-auto">
      <Authors url={"author/all"} title={"Все исполнители"} />
    </div>
  );
});

export default AllAuthors;
