import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import Navbar from "./Navbar";
import Comments from "./comments";
import "../assests/css/conversationDetails.css";

function ConversationDetails() {
  const { id } = useParams();
  const [conversation, setConversation] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`conversation/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          setConversation(response.data.conversation);
        }
      })
      .catch((err) =>
        console.error("Error fetching conversation details:", err)
      )
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="converse-container">
        <div className="conversation-details-container">
          {loading ? (
            <div className="loading-text">Loading...</div>
          ) : (
            <>
              <h1 className="conversation-title">{conversation.title}</h1>
              <img
                src={conversation.image}
                alt={conversation.title}
                className="conversation-image"
              />
              <div className="conversation-info">
                <p>
                  <strong>Category:</strong> {conversation.category}
                </p>
                <p>
                  <strong>Thoughts:</strong> {conversation.thoughts}
                </p>
                <p>
                  <strong>Author:</strong> {conversation.author}
                </p>
              </div>
              <div className="comments-section">
                <Comments conversationId={id} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ConversationDetails;
