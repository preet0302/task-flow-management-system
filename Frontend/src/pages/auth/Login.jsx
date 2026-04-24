import loginImg from "../../assets/Login.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import {useForm} from 'react-hook-form'
import {  fetchUser } from "../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  const res = await dispatch(login(data));

  if (res.meta.requestStatus === "fulfilled") {
    await dispatch(fetchUser());
    navigate("/");
  }

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
              Welcome Back! 👋
            </h2>

            <p className="text-gray-400 mb-10">
              Login to your account and continue managing your tasks.
            </p>
          </div>

          {/* IMAGE */}
          <img src={loginImg} alt="login" className="w-full max-w-md" />
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="w-1/2 bg-[#0f172a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-white text-xl mb-6">Login to your account</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <input
              className=""
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
            <button className="p-3 bg-gray-600 w-fit rounded-xl">login</button>
            <h1>
              Don't have an Account ?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-500 cursor-pointer"
              >
                Register
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
