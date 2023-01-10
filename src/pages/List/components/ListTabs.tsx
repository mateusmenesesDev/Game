type Props = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
};
export default function ListTabs({ tab, setTab }: Props) {
  return (
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
        className={`tab tab-bordered ${tab === "Plan to Play" && "tab-active"}`}
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
  );
}
