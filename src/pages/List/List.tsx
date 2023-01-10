import { useContext, useState } from "react";
import { Context } from "../../contexts/Context";
import ListGameData from "./ListGameData";

export function List() {
  const { userList } = useContext(Context);
  const [tab, setTab] = useState("All");
  return (
    <div className="">
      <div className="tabs flex-nowrap overflow-auto sm:justify-center">
        <a
          className={`tab tab-bordered ${tab === "All" && "tab-active"}`}
          onClick={() => setTab("All")}
        >
          All
        </a>
        <a
          className={`tab tab-bordered ${tab === "Playing" && "tab-active"}`}
          onClick={() => setTab("Playing")}
        >
          Playing
        </a>
        <a
          className={`tab tab-bordered ${tab === "Completed" && "tab-active"}`}
          onClick={() => setTab("Completed")}
        >
          Completed
        </a>
        <a
          className={`tab tab-bordered ${
            tab === "Plan to Play" && "tab-active"
          }`}
          onClick={() => setTab("On Hold")}
        >
          Plan to Play
        </a>
        <a
          className={`tab tab-bordered ${tab === "Dropped" && "tab-active"}`}
          onClick={() => setTab("Dropped")}
        >
          Dropped
        </a>
      </div>
      <div className="grid grid-cols-3 place-items-center my-4 ">
        <div>plataform</div>
        <div>
          {tab !== "All"
            ? userList.filter((list) => list.type === tab).length
            : userList.length}
        </div>
        <div>order</div>
      </div>
      {tab !== "All"
        ? userList
            .filter((item) => item.type === tab)
            .map((item) => <ListGameData item={item} key={item.game.id} />)
        : userList.map((item) => (
            <ListGameData item={item} key={item.game.id} />
          ))}
    </div>
  );
}
