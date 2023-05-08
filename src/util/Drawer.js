import React from "react";

export default function Drawer({ children, isOpen, setIsOpen }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article
          className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full text-black"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div className="flex flex-row justify-between p-4">
            <header className="font-bold text-lg">Details</header>
            <div
              className="flex cursor-pointer items-center align-middle justify-center"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </div>
          </div>
          {children}
        </article>
      </section>
    </main>
  );
}
