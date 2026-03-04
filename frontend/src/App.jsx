import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Subscriptions from "./pages/Subscriptions";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Channel from "./pages/Channel";
import AllVideos from "./pages/AllVideos"
import VideoWatchPage from "./pages/WatchVideo";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/channel" element={<Channel />} />
          <Route path="/all-videos" element={<AllVideos />} />
          <Route path="/watch-video" element={<VideoWatchPage />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
