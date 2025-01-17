import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const uploadRef = useRef();

  async function registerUser(ev) {
    // ev.preventDefault();
    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("email", email);
    // formData.append("password", password);

    // if (uploadRef.current?.files[0]) {
    //   console.log(`uploadRef.current.files[0] ${uploadRef.current.files[0]}`);
    //   formData.append("avatar", uploadRef.current.files[0]);
    // }

    // try {
    //   await axios.post("/user/register", formData);
    //   alert("Registration successful! Now you can login.");
    // } catch (e) {
    //   alert(e.response?.data || "Registration failed. Please try again later.");
    // }

    ev.preventDefault();
    try {
      await axios.post("/user/register", {
        username,
        email,
        password,
      });
      alert("Registration successful! Now you can login.");
    } catch (e) {
      alert("Registration failed. Please try again later.");
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    console.log(`file ${file}`);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result); // Устанавливаем содержимое файла как URL
      };
      reader.readAsDataURL(file);
      console.log(reader);
      console.log(url);
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <div className="my-2">
            {url && (
              <img
                src={url}
                alt="Avatar preview"
                className="w-32 h-32 rounded-full mx-auto"
              />
            )}
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              ref={uploadRef}
              onChange={handleFileChange}
            />
            <label
              htmlFor="avatar"
              className="w-full border my-1 py-2 px-3 rounded-2xl cursor-pointer text-center block"
            >
              {url ? "Change Avatar" : "Choose your avatar"}
            </label>
          </div>
          <input
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Allready a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
