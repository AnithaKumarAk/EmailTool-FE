import React, { useEffect, useState } from "react";
import { getToken } from "../auth/auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar/Navabr";
import Sidebar from "../components/sidebar/Sidebar";
import TemplateCard from "../components/templateCard/TemplateCard";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [templateId, setTemplateId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get("http://localhost:3100/api/v1/user/viewtemplates", config)
      .then((res) => {
        setTemplates(res.data.templates);
      })
      .catch((err) => console.log(err));
  }, [modalIsOpen]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  const handleDelete = (id) => {
    setIsOpen(true);
    setTemplateId(id);
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const onHandleConfirm = () => {
    axios
      .post(`http://localhost:3100/api/v1/user/deletetemplate/${templateId}`)
      .then((res) => {
        console.log("Successfully deleted");
        setIsOpen(false);
        toast.success("Successfully deleted group", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container">
        <Sidebar />
        <Navbar />
        <section className="home">
          <div style={{ marginTop: "100px" }}>
            <button
              className="add-record-btn"
              onClick={() => navigate("/newtemplate")}
            >
              Add Template
            </button>
            <div className="group-grid-container">
              {templates.map((template) => (
                <TemplateCard
                  key={template._id} 
                  name={template.name}
                  handleDelete={handleDelete}
                  id={template._id}
                />
              ))}
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={onRequestClose} 
              style={customStyles}
              contentLabel="Example Modal"
              className="modal"
              overlayClassName="modal-overlay"
            >
              <h2 className="modal-title">Confirm Delete Template</h2>
              <p className="modal-text">
                Are you sure you want to delete this template?
              </p>
              <div className="modal-buttons">
                <button
                  className="modal-button cancel"
                  onClick={onRequestClose}
                >
                  Cancel
                </button>
                <button
                  className="modal-button delete"
                  onClick={onHandleConfirm}
                >
                  Delete
                </button>
              </div>
            </Modal>
            <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Templates;
