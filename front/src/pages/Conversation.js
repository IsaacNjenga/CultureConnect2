import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assests/css/conversation.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserContext } from "../App";

const MySwal = withReactContent(Swal);

const customStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: 600,
      borderBottom: "2px solid #dee2e6",
      backgroundColor: "#f8f9fa",
      padding: "12px",
      textAlign: "center",
      whiteSpace: "nowrap", // Prevents text wrap
      textOverflow: "ellipsis", // Ellipsis for overflow text
      overflow: "hidden", // Hide overflow content
    },
  },
  cells: {
    style: {
      fontSize: "13px",
      fontWeight: 500,
      borderBottom: "1px solid #dee2e6",
      padding: "10px",
      textAlign: "center",
      whiteSpace: "nowrap", // Prevents text wrap
      textOverflow: "ellipsis", // Ellipsis for overflow text
      overflow: "hidden", // Hide overflow content
    },
  },
};

const Conversation = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("conversations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          setConversations(response.data.conversations);
        } else {
          toast.error("No conversations found", { position: "top-right" });
        }
      })
      .catch((err) => {
        toast.error("Error fetching conversations", { position: "top-right" });
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`conversation/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setConversations(res.data.conversations);
            MySwal.fire({
              title: "Deleted!",
              text: "Conversation deleted successfully",
              icon: "success",
            });
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "An error occurred while deleting",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.image}
          alt="Conversation_image"
          className="conversation-image"
        />
      ),
      wrap: true,
    },
    {
      name: "Title",
      selector: (row) => (
        <Link to={`/conversation/${row._id}`} className="conversation-title">
          {row.title}
        </Link>
      ),
      wrap: true,
    },
    { name: "Category", selector: (row) => row.category, wrap: true },
    { name: "Thoughts", selector: (row) => row.thoughts, wrap: true },
    { name: "Author", selector: (row) => row.author, wrap: true },
    {
      name: "Actions",
      cell: (row) =>
        user.name === row.author ? (
          <>
            <Link to={`/update-conversation/${row._id}`}>
              <FaPenToSquare className="table-icon" />
            </Link>
            <FaRegTrashCan
              className="table-icon"
              onClick={() => handleDelete(row._id)}
            />
          </>
        ) : null,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      wrap: true,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="conversations-container">
        {loading ? (
          <div className="loading-text">Loading...</div>
        ) : (
          <>
            {conversations.length === 0 && (
              <div className="no-conversations">
                <h1>No conversations posted</h1>
              </div>
            )}
            {conversations.length > 0 && (
              <DataTable
                columns={columns}
                data={conversations}
                customStyles={customStyles}
                pagination
                responsive
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Conversation;
