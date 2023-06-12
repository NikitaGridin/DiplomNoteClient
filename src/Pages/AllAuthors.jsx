import React from "react";
import { observer } from "mobx-react-lite";
import Authors from "../Components/Authors";

const AllAuthors = observer(() => {
  return (
    <div className="w-11/12 mx-auto xl:w-10/12">
      <Authors url={"author/all"} title={"Все исполнители"} />
    </div>
  );
});

export default AllAuthors;
