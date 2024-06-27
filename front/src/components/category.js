import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const MySwal = withReactContent(Swal);

const customStyles = {
  headCells: { style: { fontSize: "15px", fontWeight: 600 } },
  cells: { style: { fontSize: "13px", fontWeight: 500 } },
};

function Category() {
  const { category } = useParams();
  const { user } = useContext(UserContext);
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get("/conversations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.success) {
          const filteredConversations = response.data.conversations.filter(
            (conversation) => conversation.category === category
          );
          setContent(filteredConversations);
        } else {
          console.error("No Content Found");
        }
      })
      .catch((err) => console.log(err));
  }, [category]);

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
            setContent(res.data.conversations);
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
        ) : (
          <></>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <Navbar />
      <div>
        <h1>{category}</h1>{" "}
        {content.length === 0 ? (
          <p>No content available for this category.</p>
        ) : (
          <DataTable
            columns={columns}
            data={content}
            customStyles={customStyles}
            pagination
          />
        )}
      </div>
    </>
  );
}

export default Category;
