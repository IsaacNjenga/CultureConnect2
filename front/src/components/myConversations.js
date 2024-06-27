import React, { useEffect, useState, useContext } from "react";
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
  headCells: { style: { fontSize: "15px", fontWeight: 600 } },
  cells: { style: { fontSize: "13px", fontWeight: 500 } },
};

const MyConversations = () => {
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
          const myConversations = response.data.conversations.filter(
            (conversation) => conversation.author === user.name
          );
          setConversations(myConversations);
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
  }, [user.name]);

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure you want to delete this?",
      text: "You wont be able to revert this action!",
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
              text: "Deleted successfully",
              icon: "success",
            });
          })
          .catch((err) => {
            MySwal.fire({
              title: "Error!",
              text: "An error occured",
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
    },
    { name: "Title", selector: (row) => row.title },
    { name: "Category", selector: (row) => row.category },
    { name: "Thoughts", selector: (row) => row.thoughts },
    { name: "Author", selector: (row) => row.author },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/update-conversation/${row._id}`}>
            <FaPenToSquare className="table-icon" />
          </Link>
          <FaRegTrashCan
            className="table-icon"
            onClick={() => handleDelete(row._id)}
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
            {conversations.length === 0 && (
              <h1 className="no-conversations">
                You have no conversations posted. Click{" "}
                <Link to="/add-conversation">here</Link> to get started.
              </h1>
            )}
            <DataTable
              columns={columns}
              data={conversations}
              customStyles={customStyles}
              pagination
              noDataComponent={<div className="no-conversation"></div>}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MyConversations;
