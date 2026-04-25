import loginImg from "../../assets/Login.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.email = data.email.trim()
    setLoading(true);
    const res = await dispatch(login(data));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login successful ✅");

      navigate("/");
      reset();
    } else {
      toast.error(res.payload || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center px-4">
      {/* MAIN WRAPPER */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* LEFT (hide on mobile) */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between h-full py-10">
          {/* TOP TEXT */}
          <div className="px-10">
            <h1 className="text-purple-500 text-base mb-4">
              Task Management System
            </h1>

            <h2 className="text-4xl font-semibold text-white mb-3 leading-tight">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 text-base max-w-md">
              Login to your account and continue managing your tasks.
            </p>
          </div>

          <img src={loginImg} alt="login" className="w-full max-w-md" />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl p-8 md:p-10 min-h-[520px] flex flex-col justify-center">
            <h2 className="text-white text-xl mb-6">Login to your account</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* EMAIL */}
              <div>
                <input
                  {...register("email", {
                    required: "Email is required",

                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Enter a valid email address",
                    },

                    validate: (value) => {
                      if (value.length > 50) {
                        return "Email too long";
                      }
                       if (value.includes(" ")) {
                        return "Email should not contain spaces";
                      }

                      if (value.includes("..")) {
                        return "Email cannot contain consecutive dots";
                      }

                      return true;
                    },
                  })}
                  type="email"
                  placeholder="email@example.com"
                  className={`w-full p-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } bg-[#020617]`}
                />
                <p className="text-pink-400 text-xs mt-1">
                  {errors?.email?.message}
                </p>
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: (value) => {
                      if (!/[A-Za-z]/.test(value)) {
                        return "Password must contain at least 1 letter";
                      }
                      if (!/[0-9]/.test(value)) {
                        return "Password must contain at least 1 number";
                      }
                      return true;
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  className={`w-full p-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-white/10"
                  } bg-[#020617]`}
                />
                {watch("password")?.length > 0 && !errors.password && (
                  <p className="text-xs text-gray-400 mt-1">
                    Must contain letters & numbers (min 6 chars)
                  </p>
                )}

                {/* 👁 toggle */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

                <p className="text-pink-400 text-xs mt-1">
                  {errors?.password?.message}
                </p>
              </div>

              {/* REMEMBER */}
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" className="accent-purple-500" />
                Remember me
              </label>

              {/* BUTTON */}
              <button
                disabled={loading}
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 w-full rounded-lg active:scale-98"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* REGISTER */}
              <p className="text-sm text-gray-400 text-center">
                Don't have an Account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-purple-400 cursor-pointer"
                >
                  Register
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
