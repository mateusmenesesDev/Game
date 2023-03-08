type ListTabsProps = {
  tabOptions: string[];
  tabState: string;
  setTabState: React.Dispatch<React.SetStateAction<string>>;
};

export default function ListTabs({ tabOptions, tabState, setTabState }: ListTabsProps) {
  return (
    <div className="tabs flex-nowrap overflow-auto sm:justify-center">
      {tabOptions.map((option) => (
        <a
          key={option}
          className={`tab tab-bordered ${tabState === option && "tab-active"}`}
          onClick={() => setTabState(option)}
        >
          {option}
        </a>
      ))}
    </div>
  );
}