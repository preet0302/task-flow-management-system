import Img404 from "../assets/404page.png";

const PageNotFound = () => {
  return (
    <div
      className="h-screen w-full bg-contain bg-center bg-no-repeat bg-[#020617]"
      style={{
        backgroundImage: `url(${Img404})`,
      }}
    ></div>
  );
};

export default PageNotFound;
