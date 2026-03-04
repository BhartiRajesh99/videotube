import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { NavLink } from "react-router-dom";;
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";

function Login() {
  const navigate = useNavigate();
  const {login} = useAuth()
  const [form, setForm] = React.useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async(e) => {
    try {
      e.preventDefault();

      const response = await login(form)
      console.log(response);

      if (response) {
        setForm({
          identifier: "",
          password: "",
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative m-auto flex min-h-screen max-w-6xl items-center justify-between px-6">
        <div className="">
          <h1 className="text-5xl font-bold tracking-tighter text-neutral-800">
            Welcome back to{" "}
            <span className="relative inline-block px-1 text-white after:absolute after:inset-0 after:-z-4 after:h-full after:w-full after:-skew-y-2 after:bg-black after:p-1 after:content-['']">
              VideoTube
            </span>
          </h1>
          <p className="text-md mt-5 tracking-tight text-slate-700">
            Access your saved playlists, follow your favorite creators, and stay
            connected to what you love watching.
          </p>
          <p className="mt-1 tracking-tight text-slate-700">
            Sign in and start watching.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="relative z-1 flex w-105 flex-col gap-4 rounded-2xl border border-slate-300 bg-white p-8 shadow-[4px_4px_20px_#00000020] backdrop-blur-xl"
        >
          <div className="mb-2">
            <Back />
            <h1 className="text-center text-2xl font-bold tracking-tighter text-slate-800">
              Welcome Back
            </h1>
            <p className="text-center text-sm tracking-tight text-neutral-600">
              Sign in to continue
            </p>
          </div>

          <Input
            onChange={handleChange}
            value={form.identifier}
            label={"Username/Email"}
            placeholder="Enter your email or username"
            name="identifier"
            type="text"
            className=""
          />

          <Input
            onChange={handleChange}
            value={form.password}
            label={"Password"}
            placeholder="Enter your password"
            name="password"
            type="password"
            className=""
          />

          <Button type="submit">Login</Button>

          <p className="text-center text-xs text-neutral-800">
            Don't heave an account?{" "}
            <NavLink to={"/signup"} className="font-medium text-blue-600">
              Signup
            </NavLink>
          </p>
        </form>
      </div>
      <Background />
    </>
  );
}

export default Login;
