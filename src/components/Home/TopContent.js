import Image from "next/image";

const TopContent = () => {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-600 sm:text-6xl">
          Property Co.
        </h1>
        <div className="h-54 w-44 overflow-hidden rounded-lg my-10 m-auto">
          <Image
            src={"/images/logo.svg"}
            alt="house image"
            width={40}
            height={40}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default TopContent;
