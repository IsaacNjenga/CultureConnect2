import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import Navbar from "./Navbar";
import Comments from "./comments";
import CustomMoment from "./customMoment";
import "../assests/css/conversationDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import Icons from "./icons";

function ConversationDetails() {
  const { id } = useParams();
  const [conversation, setConversation] = useState({});
  const [loading, setLoading] = useState(true);
  const [audio, setAudio] = useState(false);
  const { user } = useContext(UserContext);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(`conversation/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          setConversation(response.data.conversation);
          setAudio(!!response.data.conversation.audio);
        }
      } catch (err) {
        console.error("Error fetching conversation details:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await axios.get(`/likes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          setLikes(response.data.likes);
          const likedByUser = response.data.likes.some(
            (like) => like.userId === user._id
          );
          setIsLiked(likedByUser);
        }
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };

    if (id && user) {
      fetchConversation();
      fetchLikes();
    }
  }, [id, user]);

  const renderAudioPlayer = () => {
    if (audio) {
      return (
        <div className="audio-player">
          <audio controls>
            <source src={conversation.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
    return null;
  };

  const addToFavourites = () => {
    axios
      .post(
        `like`,
        {
          userId: user._id,
          title: conversation.title,
          user: user.name,
          titleId: id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((result) => {
        const newLike = result.data;
        setLikes((prevLikes) => [...prevLikes, newLike]);
        setIsLiked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromFavourites = async (id) => {
    try {
      await axios.delete(`/unlike/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLikes((prevLikes) => prevLikes.filter((like) => like._id !== id));
      setIsLiked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavourite = (title) => {
    const existingLike = likes.find(
      (like) => like.title === conversation.title
    );
    if (existingLike) {
      removeFromFavourites(existingLike._id);
    } else {
      addToFavourites(title);
    }
  };

  return (
    <>
      <Navbar />
      <div className="converse-container">
        <div className="conversation-details-container">
          {loading ? (
            <div className="loading-text">Loading...</div>
          ) : (
            <>
              <div className="card-header">
                <Icons category={conversation.category} />
                <h2 style={{ margin: 0 }}>{conversation.category}</h2>
                <span style={{ margin: "0 5px" }}></span>
              </div>
              <br />
              <hr />
              <br />
              <h1 className="conversation-title">
                {conversation.title}{" "}
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  {user.name === conversation.author
                    ? "You posted"
                    : `By ${conversation.author}`}{" "}
                  · <CustomMoment postedTime={conversation.createdAt} />
                </p>
              </h1>{" "}
              <br />
              <div className="conversation-info">
                <p>{conversation.thoughts}</p>{" "}
                {conversation.image ? (
                  <div className="conversation-images">
                    <img
                      src={conversation.image}
                      alt="Conversation_image"
                      className="conversation-image"
                    />
                  </div>
                ) : null}
                {renderAudioPlayer()}
                <button onClick={toggleFavourite}>
                  {isLiked ? (
                    <FontAwesomeIcon
                      icon={faSolidHeart}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faRegularHeart} />
                  )}
                </button>
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
