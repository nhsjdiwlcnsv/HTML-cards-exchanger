import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostcardPage() {
  const [postcard, setPostcard] = useState(null);
  const { id } = useParams();
  const [bgUrl, setBgUrl] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const getBgUrl = async () => {
      if (postcard?.background) {
        const url = await fetchBackground(postcard.background);
        setBgUrl(url);
      }
    };
    getBgUrl();
  }, [postcard]);

  useEffect(() => {
    const fetchPostcard = async (id) => {
      try {
        const response = await axios.get(`/postcard/${id}`);
        setPostcard(response.data);
      } catch (error) {
        console.error("Error fetching postcard:", error);
      }
    };
    fetchPostcard(id);
  }, [id]);

  const handleSharePostcard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setCopySuccess('Postcard URL copied to clipboard!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  if (!postcard) {
    return <div>No postcard data available.</div>;
  }

  return (
    <>
    <div className="postcard-container flex justify-center items-center p-4">
      <div className="postcard border border-gray-300 rounded-lg shadow-lg bg-white relative" style={{ width: "297mm", height: "210mm" }}>
        {/* Background */}
        {postcard.background && (
          <img
            src={bgUrl}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        )}
        
        {/* Title */}
        <h2
          className="absolute"
          style={{
            left: postcard.title.position.x,
            top: postcard.title.position.y,
            fontSize: "24px",
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          {postcard.title.value}
        </h2>

        {/* Description */}
        <p
          className="absolute"
          style={{
            left: postcard.description.position.x,
            top: postcard.description.position.y,
            fontSize: "16px",
            color: "black",
            textAlign: "left",
          }}
        >
          {postcard.description.value}
        </p>

        {/* Frame */}
        {postcard.frame && (
          <div
            className="absolute"
            style={{
              border: `${postcard.frame.thickness}px solid ${postcard.frame.color || 'black'}`,
              borderRadius: "8px",
              boxSizing: "border-box",
              inset: "0",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Stickers */}
        {postcard.stickers.map((sticker, index) => (
          <img
            key={index}
            src={sticker.image}
            alt={`Sticker ${index}`}
            className="absolute"
            style={{
              left: sticker.position.x,
              top: sticker.position.y,
              width: "50px",
              height: "50px",
            }}
          />
        ))}

        {/* Interactive Elements */}
        {postcard.interactiveElements.map((element, index) => {
          const { position, type, text } = element;
          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: position.x,
                top: position.y,
              }}
            >
              {type === "textarea-button" && (
                <textarea
                  placeholder={text}
                  className="border rounded p-1"
                  style={{ width: "100px", height: "50px" }}
                />
              )}
              {type === "single-button" && (
                <button className="bg-blue-500 text-white rounded p-2">{text}</button>
              )}
              {type === "two-buttons" && (
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white rounded p-2">{text[0]}</button>
                  <button className="bg-blue-500 text-white rounded p-2">{text[1]}</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Share Button */}
      </div>
      <div>
      <button 
        onClick={handleSharePostcard}
        className="mt-4 primary text-white rounded p-2"
      >
        Share Postcard
      </button>

      {/* Copy Success Message */}
      {copySuccess && alert(copySuccess)}
      </div>
</>

  );
}

async function fetchBackground(imageId) {
  try {
    const response = await axios({
      method: "GET",
      url: `/assets/images/${imageId}`,
      responseType: "blob"
    });

    const bgUrl = URL.createObjectURL(response.data);
    return bgUrl;
  } catch (error) {
    console.error("Error fetching bg", error);
    return "https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"; 
  }
}