import Toggle from "./Toggle";

export default function Header() {
  return (
    <main className="bg-white dark:bg-dark-mode-element">
      <div className="w-[90%] m-auto p-6 flex items-center justify-between">
        <p className="text-[24px] dark:text-white text-very-dark-blue font-bold">
          Where in the World?
        </p>
        <Toggle />
      </div>
    </main>
  );
}
