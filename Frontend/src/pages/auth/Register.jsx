import registerImg from "../../assets/Register.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const registerHandler = (data) => {
    dispatch(registerUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
    reset();
  };
  return (
    <div className="h-screen w-full bg-[#020617] flex items-center justify-center px-6">
      {/* MAIN WRAPPER */}
      <div className="w-full max-w-6xl flex gap-6">
        {/* LEFT SIDE */}
        <div className="w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-white text-lg mb-6">TaskFlow</h1>

            <h2 className="text-3xl font-semibold text-white mb-3">
              Create Account 🚀
            </h2>

            <p className="text-gray-400 mb-10">
              Join us and start organizing your tasks efficiently.
            </p>
          </div>

          {/* IMAGE */}
          <img src={registerImg} alt="register" className="w-full max-w-md" />
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="w-1/2 bg-[#0f172a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-white text-xl mb-6">Create your account</h2>

          <form
            onSubmit={handleSubmit(registerHandler)}
            className="flex flex-col gap-3"
          >
            <input
              {...register("name", {
                required: "name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letter allowed (no numbers)",
                },
              })}
              type="text"
              placeholder="Enter your name"
            />
            <p>{errors?.name?.message}</p>

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              type="email"
              placeholder="email@example.com"
            />
            <p>{errors?.email?.message}</p>

            <p>{errors?.phone?.message}</p>
            <input
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$/,
                  message: "Invalid Password",
                },
              })}
              type="password"
              placeholder="**********"
            />
            <p>{errors?.password?.message}</p>
            <button className="bg-blue-400  p-2">Regitser</button>
            <h1>
              have an Account ?
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer"
              >
                login
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
