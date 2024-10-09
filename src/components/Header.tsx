import Toggle from "./Toggle";

export default function Header() {
  return (
    <main className="bg-white dark:bg-dark-mode-element shadow">
      <div className="w-[90%] m-auto  py-6 lg:p-6 flex items-center justify-between">
        <p className="text-[14px] lg:text-[24px] dark:text-white text-very-dark-blue font-bold">
          Where in the World?
        </p>
        <Toggle />
      </div>
    </main>
  );
}
