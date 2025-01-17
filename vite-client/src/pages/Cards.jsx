import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import PostcardItem from "../components/PostcardItem";

export default function CardsPage({title, api_response}) {
  const { user } = useContext(UserContext);
  const [postcards, setPostcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState(title);
  const [apiResponse, setApiResponse] = useState(api_response);

  useEffect(() => {
    const fetchPostcards = async () => {
      try {
        const response = await axios.get(apiResponse);
        setPostcards(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    setPageTitle(title);
    setApiResponse(api_response);

    fetchPostcards();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {postcards.length > 0 ? (
          postcards.map((postcard) => (
            <PostcardItem key={postcard._id} postcard={postcard} />
          ))
        ) : (
          <div>No postcards found.</div>
        )}
      </div>
    </div>
  );
}