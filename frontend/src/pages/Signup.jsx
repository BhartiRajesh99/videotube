import { useState } from "react";
import { api } from "../../api/axios";
import Input from "../components/Input";
import { NavLink } from "react-router";
import FileInput from "../components/FileInput";
import Button from "../components/Button";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";

function Signup() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);
      formData.append("fullname", form.fullname);
      formData.append("email", form.email);
      formData.append("avatar", avatar);
      formData.append("coverImage", coverImage);
      const response = await api.post("/users/register", formData);
      console.log(response);

      if (response.data.success) {
        setForm({
          fullname: "",
          username: "",
          email: "",
          password: "",
        });
        setAvatar(null);
        setCoverImage(null);
      }

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div className="relative m-auto my-4 flex min-h-screen max-w-6xl items-center justify-between p-8">
        <div className="">
          <h1 className="text-5xl font-bold tracking-tighter text-neutral-800">
            Join{" "}
            <span className="relative inline-block px-1 text-white after:absolute after:inset-0 after:-z-4 after:h-full after:w-full after:-skew-y-2 after:bg-black after:p-1 after:content-['']">
              VideoTube
            </span>{" "}
            today.
          </h1>
          <p className="text-md mt-5 tracking-tight text-slate-700">
            Create playlists, subscribe to your favorite creators, and never
            miss what matters to you.
          </p>
          <p className="mt-1 tracking-tight text-slate-700">
            Stream. Discover. Repeat.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="relative z-1 flex w-105 flex-col gap-2 rounded-2xl border border-slate-300 bg-white p-8 shadow-[4px_4px_20px_#00000020] backdrop-blur-xl"
        >
          <div className="mb-2">
            <Back />
            <h1 className="text-center text-2xl font-bold tracking-tighter text-slate-800">
              Create Account
            </h1>
            <p className="text-center text-sm tracking-tight text-neutral-600">
              Join us and get started
            </p>
          </div>
          <Input
            onChange={handleChange}
            value={form.fullname}
            placeholder="Enter your name"
            label={"Name"}
            name="fullname"
            type="text"
          />
          <Input
            onChange={handleChange}
            value={form.username}
            placeholder="Enter your username"
            label={"Username"}
            name="username"
            type="text"
          />
          <Input
            onChange={handleChange}
            value={form.email}
            placeholder="Enter your email"
            label={"Email"}
            name="email"
            type="email"
            className={"invalid:border-l-red-500"}
          />
          <Input
            onChange={handleChange}
            value={form.password}
            placeholder="Enter your password"
            label={"Password"}
            name="password"
            type="password"
          />
          <div className="flex flex-col gap-2">
            <FileInput name="avatar" placeholder={"Choose Avatar"} onChange={setAvatar} />
            <FileInput name="coverImage" placeholder={"Choose Cover Image"} onChange={setCoverImage} />
          </div>

          <Button type="submit">Signup</Button>

          <p className="text-center text-xs text-neutral-800">
            Already heave an account?{" "}
            <NavLink to={"/login"} className="font-medium text-blue-600">
              Login
            </NavLink>
          </p>
        </form>
      </div>
      <Background />
    </>
  );
}

export default Signup;
