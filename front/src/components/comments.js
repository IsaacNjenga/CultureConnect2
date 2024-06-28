import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import "../assests/css/comments.css"

function Comments({ conversationId }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const author = user.name;

  useEffect(() => {
    if (conversationId) {
      axios
        .get(`comments/${conversationId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((result) => {
          setComments(result.data.comments);
        })
        .catch((err) => console.log(err));
    }
  }, [conversationId]);

  const handleNewComment = () => {
    if (conversationId) {
      axios
        .post(
          "comments",
          {
            content: newComment,
            author,
            conversationId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setComments([...comments, response.data.comment]);
          setNewComment("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-heading">Comments</h3>
      {comments.length > 0 ? (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment._id} className="comment-item">
              <strong className="comment-author">{comment.author}:</strong>{" "}
              {comment.content}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-comments-msg">No comments yet</p>
      )}
      <div className="comment-input-container">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="comment-input"
        />
        <button onClick={handleNewComment} className="comment-submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Comments;
