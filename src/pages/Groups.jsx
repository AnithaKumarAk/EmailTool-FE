import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../auth/auth";

import "react-toastify/dist/ReactToastify.css";
import "../styles/dashboard.css";
import GroupModal from "../components/Modal/Modal";
import GroupCard from "../components/groupCard/GroupCard";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navabr";

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

function Groups() {
  const [modalView, setModalView] = useState(false);
  const [groups, setGroups] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupId, setGroupId] = useState("");

  const handleModal = (res) => {
    setModalView(res);
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const onHandleConfirm = () => {
    axios
      .post(`http://localhost:3100/api/v1/user/deletegroup/${groupId}`)
      .then((res) => {
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
        setGroups(groups.filter((group) => group._id !== groupId));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get("http://localhost:3100/api/v1/user/viewgroups", config)
      .then((res) => {
        setGroups(res.data.groups);
      })
      .catch((err) => console.log(err));
  }, [modalView, modalIsOpen]);

  const handleDelete = (id) => {
    setIsOpen(true);
    setGroupId(id);
  };

  return (
    <div>
      <div className='container'>
        <Sidebar />
        <Navbar />
        <section className='home'>
          <div style={{ marginTop: "100px" }}>
            <button className='add-record-btn' onClick={() => setModalView(true)}>
              Add Group
            </button>
            <div className='group-grid-container'>
              {groups.map((group) => (
                <GroupCard
                  key={group._id} // Ensure each key is unique
                  name={group.name}
                  emails={group.emails.length}
                  handleDelete={handleDelete}
                  id={group._id}
                />
              ))}
            </div>
            {modalView && (
              <GroupModal handleModal={handleModal} />
            )}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={onRequestClose}
              style={customStyles}
              contentLabel='Confirm Delete Group'
              className='modal'
              overlayClassName='modal-overlay'
            >
              <h2 className='modal-title'>Confirm Delete Group</h2>
              <p className='modal-text'>
                Are you sure you want to delete this group?
              </p>
              <div className='modal-buttons'>
                <button
                  className='modal-button cancel'
                  onClick={onRequestClose}
                >
                  Cancel
                </button>
                <button
                  className='modal-button delete'
                  onClick={onHandleConfirm}
                >
                  Delete
                </button>
              </div>
            </Modal>
            <ToastContainer
              position='bottom-right'
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Groups;
