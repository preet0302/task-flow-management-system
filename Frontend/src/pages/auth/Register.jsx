import registerImg from "../../assets/Register.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const registerHandler = async (data) => {
    data.name = data.name.trim();
    data.email = data.email.trim();
    const { confirmPassword, ...finalData } = data;
    setLoading(true);
    const res = await dispatch(registerUser(finalData));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Account created successfully 🎉");
      navigate("/login");
      reset();
    } else {
      toast.error(res.payload || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* left Image text*/}
        <div className="hidden lg:flex w-1/2 flex-col justify-between h-full py-10">
          <div className="px-10">
            <h1 className="text-purple-500 text-base mb-4">
              Task Management System
            </h1>

            <h2 className="text-4xl font-semibold text-white mb-3 leading-tight">
              Create Account 🚀
            </h2>

            <p className="text-gray-400 text-base max-w-md">
              Join us and start organizing your tasks efficiently.
            </p>
          </div>

          <img src={registerImg} alt="Register" className="w-full max-w-md" />
        </div>

        {/* Right Side Form  */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl p-8 md:p-10 min-h-[520px] flex flex-col justify-center">
            <h2 className="text-white text-xl mb-6">Create your account</h2>

            <form
              onSubmit={handleSubmit(registerHandler)}
              className="flex flex-col gap-5"
            >
              {/* NAME */}
              <div>
                <input
                disabled={loading}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters allowed",
                    },
                  })}
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full p-3 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-white/10"
                  } bg-[#020617]`}
                />
                <p className="text-pink-400 text-xs mt-1">
                  {errors?.name?.message}
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <input
                  disabled={loading}
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
                  disabled={loading}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: (value) => {
                      if (!/[A-Za-z]/.test(value)) {
                        return "Must contain at least 1 letter";
                      }
                      if (!/[0-9]/.test(value)) {
                        return "Must contain at least 1 number";
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

                {/*Password See Icon  */}
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
              <div className="relative">
                <input
                  disabled={loading}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full p-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-white/10"
                  } bg-[#020617]`}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

                <p className="text-pink-400 text-xs mt-1">
                  {errors?.confirmPassword?.message}
                </p>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 w-full rounded-lg disabled:opacity-50 disabled:cursor-not-allowed 
                 active:scale-95 transition hover:scale-[1.02] duration-200"
              >
                {loading ? "Creating..." : "Register"}
              </button>

              {/* LOGIN */}
              <p className="text-sm text-gray-400 text-center">
                Have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-purple-400 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
