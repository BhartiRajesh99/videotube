import { useEffect, useState } from "react";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { HiPencil } from "react-icons/hi";
import { api } from "../../api/axios";
import Loading from "../components/Loading";

export default function Settings() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    avatar: null,
    coverImage: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (form.fullname !== user.fullname) {
        const response = await api.patch("/users/update-account", {
          fullname: form.fullname,
          email: form.email,
        });
        console.log(response.data);
        setUser(response.data.data);
      }

      if (form.avatar instanceof File) {
        const formData = new FormData();
        formData.append("avatar", form.avatar);
        const response = await api.patch("/users/avatar", formData);
        console.log(response.data);
        setUser(response.data.data);
      }

      if (form.coverImage instanceof File) {
        const formData = new FormData();
        formData.append("coverImage", form.coverImage);
        const response = await api.patch("/users/cover-image", formData);
        console.log(response.data);
        setUser(response.data.data);
      }

      if (form.currentPassword && form.newPassword && form.confirmPassword) {
        const response = await api.post("/users/change-password", {
          oldPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
        console.log(response.data);
        setUser(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        avatar: user.avatar || null,
        coverImage: user.coverImage || null,
      }));
    }
  }, [user]);

  return (
    <div className="w-full space-y-8 bg-white pt-2 shadow">
      <h2 className="ml-2 text-4xl font-bold">Profile Settings</h2>
      <div className="relative mb-35 w-full">
        {/* Cover Image */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-200">
          <div className="relative h-60 w-full overflow-hidden bg-slate-200">

            {/* Original Image */}
            {form.coverImage && !(form.coverImage instanceof File) && (
              <img
                src={form.coverImage}
                className="absolute h-full w-full object-cover"
              />
            )}

            {/* Preview Mask */}
            {coverPreview && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm">
                <img
                  src={coverPreview}
                  className="h-full w-full object-cover opacity-80"
                />
              </div>
            )}
          </div>

          <label
            htmlFor="cover-image"
            className="absolute inset-0 z-1 flex h-full w-full cursor-pointer items-center justify-center text-sm opacity-0 transition-colors duration-200 hover:bg-black/20 hover:opacity-100"
          >
            <HiPencil className="size-16 rounded-full bg-white/20 p-4 text-white backdrop-blur-sm" />
          </label>
          <input
            type="file"
            id="cover-image"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
        
              setForm({ ...form, coverImage: file });
              setCoverPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        {/* Avatar */}
        <div className="absolute top-50 left-6 flex h-40 items-center gap-4 overflow-hidden">
          <div className="relative z-1 h-40 w-40 overflow-hidden rounded-full bg-slate-200">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-slate-300">
          
              {/* Old Avatar */}
              {form.avatar && !(form.avatar instanceof File) && (
                <img
                  src={form.avatar}
                  className="absolute h-full w-full object-cover"
                />
              )}

              {/* New Avatar Preview */}
              {avatarPreview && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm">
                  <img
                    src={avatarPreview}
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>
              )}
            </div>

            <label
              htmlFor="avatar"
              className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full text-sm opacity-0 transition-colors duration-200 hover:bg-black/40 hover:opacity-100"
            >
              <HiPencil className="size-10 rounded-full bg-white/30 p-2 text-white backdrop-blur-sm" />
            </label>
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
            
                setForm({ ...form, avatar: file });
                setAvatarPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          <div className="ml-2 flex flex-col gap-0.5">
            <p className="text-4xl font-bold">{user.fullname || ""}</p>
            <p className="text-xs text-gray-500">{user.username || ""}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => handleClick(e)}
        className="flex flex-col gap-4 px-6"
      >
        {/* Full Name */}
        <div>
          <Input
            type={"text"}
            label={"Fullname"}
            value={form.fullname}
            onChange={(e) => handleChange(e)}
            name={"fullname"}
            placeholder={"Enter your full name"}
          />
        </div>

        {/* Email */}
        <div>
          <Input
            type={"email"}
            label={"Email"}
            name={"email"}
            placeholder={"Enter your email"}
            value={form.email}
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* Password Section */}
        <div className="border-t pt-6">
          <h3 className="mb-4 text-lg font-semibold">Change Password</h3>

          <div className="flex flex-col gap-2 space-y-4">
            <Input
              type="password"
              label={"Current Password"}
              name="currentPassword"
              placeholder="Enter current password"
              value={form.currentPassword}
              onChange={handleChange}
            />

            <Input
              type="password"
              label={"New Password"}
              name="newPassword"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={handleChange}
            />

            <Input
              type="password"
              label={"Confirm Password"}
              name="confirmPassword"
              placeholder="Enter confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2 pb-6">
          <button
            type="submit"
            className="relative cursor-pointer rounded-lg bg-black px-6 py-2 text-white shadow transition-all duration-200 hover:scale-102 hover:bg-neutral-800 active:scale-101"
          >
            {loading ? <Loading /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
