import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import CardsPage from "./Cards";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState('');
  const { ready, user, setUser } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState(null); 

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/user/logout");
    setUser(null);
    setRedirect("/");
  }


  useEffect(() => {
    const getAvatarUrl = async () => {
      if (user?.avatar) {
        const url = await fetchAvatar(user.avatar);
        setAvatarUrl(url);
      }
    };
    getAvatarUrl();
  }, [user]);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-600 text-center p-10">
        My profile
      </h1>
      {subpage === "profile" && (
        <div className="text-center">
          {/* Display avatar if URL is available */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
          ) : (
            <img
              src="https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"
              alt="Default Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
          )}
          Logged in as {user.username} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

async function fetchAvatar(avatarId) {
  try {
    const response = await axios({
      method: "GET",
      url: `/assets/avatars/${avatarId}`,
      responseType: "blob"
    });

    const avatarUrl = URL.createObjectURL(response.data);
    return avatarUrl;
  } catch (error) {
    console.error("Error fetching avatar", error);
    return "https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"; // Fallback URL
  }
}
