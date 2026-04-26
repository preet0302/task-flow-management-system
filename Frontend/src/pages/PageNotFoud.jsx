import Img404 from "../assets/404page.png";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
   <div className="h-screen w-full bg-[#020617] flex items-center justify-center">

  <div className="relative">

    
    <img
      src={Img404}
      alt="404"
      className="max-w-sm md:max-w-md"
    />

    
    <button
      onClick={() => navigate("/")}
      className="absolute left-1/2 -translate-x-[40%] bottom-6 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
    >
      Go to Home
    </button>

  </div>
</div>
);
};

export default PageNotFound;