import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ItemTypes = {
  TEXT: "text",
};

const DraggableText = ({ text, position, setPosition }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TEXT,
    item: { text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    >
      {text}
    </div>
  );
};

const PostcardPreview = ({ title, description, setTitlePosition, setDescriptionPosition, frame }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TEXT,
    drop: (item, monitor) => {
      const delta = monitor.getClientOffset();
      const dropPosition = {
        x: delta.x - 150, // Adjust based on the width of the text
        y: delta.y - 50,  // Adjust based on the height of the text
      };

      if (item.text === title.value) {
        setTitlePosition(dropPosition);
      } else if (item.text === description.value) {
        setDescriptionPosition(dropPosition);
      }
    },
  }));

  return (
    <div
      ref={drop}
      className="postcard-preview relative"
      style={{
        width: "297mm",
        height: "210mm",
        position: "relative",
        backgroundColor: "#fff",
      }}
    >
      {/* Frame */}
      {frame && (
        <div
          className="absolute"
          style={{
            borderTop: frame.type === "top-bottom" || frame.type === "full" 
              ? `${frame.thickness}px solid ${frame.color || 'black'}` 
              : 'none',
            borderBottom: frame.type === "top-bottom" || frame.type === "full" 
              ? `${frame.thickness}px solid ${frame.color || 'black'}` 
              : 'none',
            borderLeft: frame.type === "left-right" || frame.type === "full" 
              ? `${frame.thickness}px solid ${frame.color || 'black'}` 
              : 'none',
            borderRight: frame.type === "left-right" || frame.type === "full" 
              ? `${frame.thickness}px solid ${frame.color || 'black'}` 
              : 'none',
            borderRadius: "8px",
            boxSizing: "border-box",
            inset: "0",
            pointerEvents: "none",
          }}
        />
      )}
      <DraggableText
        text={title.value}
        position={title.position}
        setPosition={setTitlePosition}
      />
      <DraggableText
        text={description.value}
        position={description.position}
        setPosition={setDescriptionPosition}
      />
    </div>
  );
};

export default function CreatePostcardPage() {
  const { user } = useContext(UserContext);
  const [recipients, setRecipients] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [title, setTitle] = useState({ value: "", position: { x: 0, y: 0 } });
  const [description, setDescription] = useState({ value: "", position: { x: 0, y: 0 } });
  const [frame, setFrame] = useState({ type: "full", thickness: 1, color: "#000", image: null });
  const [background, setBackground] = useState(null);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/all");
        setAllUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleTitlePosition = (pos) => setTitle((prev) => ({ ...prev, position: pos }));
  const handleDescriptionPosition = (pos) => setDescription((prev) => ({ ...prev, position: pos }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const postcardData = {
        owner: user._id,
        recipients: selectedRecipients,
        title,
        description,
        frame,
        stickers: [],
        interactiveElements: [],
        background,
        audio,
      };

      const response = await axios.post("/postcard", postcardData);
      console.log("Postcard created:", response.data);
      navigate(`/postcard/${response.data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipientChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedRecipients(value);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <div className="flex-1 p-4">
          <PostcardPreview
            title={title}
            description={description}
            setTitlePosition={handleTitlePosition}
            setDescriptionPosition={handleDescriptionPosition}
            frame={frame} // Pass frame properties
          />
        </div>
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Create Postcard</h1>
          {error && <div className="text-red-500">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block mb-1">Title:</label>
              <input
                type="text"
                value={title.value}
                onChange={(e) => setTitle({ ...title, value: e.target.value })}
                className="border p-2 w-full"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block mb-1">Description:</label>
              <textarea
                value={description.value}
                onChange={(e) => setDescription({ ...description, value: e.target.value })}
                className="border p-2 w-full"
                required
              />
            </div>

            {/* Recipients Selection */}
            <div>
              <label className="block mb-1">Select Recipients:</label>
              <select
                multiple
                value={selectedRecipients}
                onChange={handleRecipientChange}
                className="border p-2 w-full"
              >
                {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Frame Type */}
            <div>
              <label className="block mb-1">Frame Type:</label>
              <select
                value={frame.type}
                onChange={(e) => setFrame({ ...frame, type: e.target.value })}
                className="border p-2 w-full"
              >
                <option value="full">Full</option>
                <option value="top-bottom">Top-Bottom</option>
                <option value="left-right">Left-Right</option>
              </select>
            </div>

            {/* Frame Thickness */}
            <div>
              <label className="block mb-1">Frame Thickness:</label>
              <input
                type="number"
                value={frame.thickness}
                onChange={(e) => setFrame({ ...frame, thickness: Number(e.target.value) })}
                className="border p-2 w-full"
                required
              />
            </div>

            {/* Frame Color */}
            <div>
              <label className="block mb-1">Frame Color:</label>
              <input
                type="color"
                value={frame.color}
                onChange={(e) => setFrame({ ...frame, color: e.target.value })}
                className="border p-2 w-full"
              />
            </div>

            {/* Background Image */}
            <div>
              <label className="block mb-1">Background Image:</label>
              <input
                type="file"
                name="bgImage"
                id="bgImage"
                onChange={(e) => setBackground(e.target.files[0])}
                className="border p-2 w-full"
              />
            </div>

            {/* Audio Input */}
            {/* Uncomment if audio upload is needed */}
            {/* <div>
              <label className="block mb-1">Audio:</label>
              <input
                type="file"
                onChange={(e) => setAudio(e.target.files[0])}
                className="border p-2 w-full"
              />
            </div> */}

            <button
              type="submit"
              className={`primary ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Postcard"}
            </button>
          </form>
        </div>
      </div>
    </DndProvider>
  );
}