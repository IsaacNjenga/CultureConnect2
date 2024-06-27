import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assests/css/conversation.css";

const customStyles = {
  headCells: { style: { fontSize: "15px", fontWeight: 600 } },
  cells: { style: { fontSize: "13px", fontWeight: 500 } },
};

const Conversation = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

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
    //to implement delete logic
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.image}
          alt="Conversation"
          className="conversation-image"
        />
      ),
    },
    { name: "Title", selector: (row) => row.title },
    { name: "Category", selector: (row) => row.category },
    { name: "Thoughts", selector: (row) => row.thoughts },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/edit-conversation/${row.id}`}>
            <FaPenToSquare className="table-icon" />
          </Link>
          <FaRegTrashCan
            className="table-icon"
            onClick={() => handleDelete(row.id)}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="conversations">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {conversations.length === 0 && <h1>No conversations posted</h1>}
            <DataTable
              columns={columns}
              data={conversations}
              customStyles={customStyles}
              pagination
            />
          </>
        )}
      </div>
    </>
  );
};

export default Conversation;
