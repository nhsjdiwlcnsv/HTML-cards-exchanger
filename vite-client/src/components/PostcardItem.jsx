import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PostcardItem({ postcard }) {
    const [bgUrl, setBgUrl] = useState(null); 
    
    useEffect(() => {
        const getBgUrl = async () => {
            if (postcard?.background) {
                console.log(postcard.background)
                const url = await fetchBackground(postcard.background);
                setBgUrl(url);
            }
        };
        getBgUrl();
    }, [postcard]);
  return (
    <Link to={`/postcard/${postcard._id}`} className="border rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold">{postcard.title.value}</h2>
      {postcard.background? <img
        src={bgUrl}
        alt="Postcard background"
        className="w-full h-32 object-cover rounded"
      />: <>no background</>}
      <p className="mt-2">{postcard.description.value}</p>
      <div className="mt-4">
        {postcard.recipients && postcard.recipients.map((recipient) => (
          <div key={recipient._id}>{recipient.username}</div>
        ))}
      </div>
    </Link>
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