import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";
import CardsPage from "./pages/Cards";
import CreatePostcardPage from "./pages/CreatePostcard";
import PostcardPage from "./pages/Postcard";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/owned" element={<CardsPage title="My owned postcards" api_response="/postcard/owned"/>} />
          <Route path="/account/received" element={<CardsPage title="My received postcards" api_response="/postcard/received"/>} />
          <Route path="/postcard/:id" element={<PostcardPage />} />
          <Route path="/postcard/create" element={<CreatePostcardPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
