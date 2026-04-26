import unauthImg from "../assets/Unauthorized.png";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#020617] flex items-center justify-center">
      <div className="relative">
       
        <img
          src={unauthImg}
          alt="unauthorized"
          className="max-w-sm md:max-w-md"
        />

       
        <button
          onClick={() => navigate("/")}
          className="absolute left-1/2 -translate-x-1/2 top-[72%] px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
