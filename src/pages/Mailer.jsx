import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../auth/auth";
import "react-toastify/dist/ReactToastify.css";
import "../styles/dashboard.css";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navabr";
import TemplateOption from "../components/tamplateOption/TemplateOption";

function Send() {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("none");

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
      .catch((err) => {
        console.error("Error fetching groups:", err);
        toast.error("Failed to load groups. Please try again later.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  const handleSubmit = async () => {
    if (!group || !subject || !message) {
      toast.error("Please fill all required fields.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const payload = { group, subject, message, template };

    try {
      const token = getToken();
      const config = { headers: { Authorization: token } };

      const response = await axios.post(
        "http://localhost:3100/api/v1/user/sendmail",
        payload,
        config
      );

      if (response.data.success) {
        toast.success("Successfully sent mails", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(response.data.message || "Failed to send mails. Please try again later.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send mails. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleTemplateOption = (id) => {
    setTemplate(id);
  };

  return (
    <div>
      <div className='container'>
        <Sidebar />
        <Navbar />
        <section className='home'>
          <div style={{ marginTop: "100px" }}>
            <div className='mailer-container'>
              <div className='email-card'>
                <h2 className='email-card__title'>Compose New Email</h2>
                <form className='email-card__form'>
                  <div className='form-group'>
                    <label htmlFor='emailTo'>To:</label>
                    <select
                      className='form-control'
                      id='emailTo'
                      onChange={(e) => setGroup(e.target.value)}
                      value={group}
                    >
                      <option value="">Select a group</option>
                      {groups.length > 0 ? (
                        groups.map((group) => (
                          <option key={group._id} value={group._id}>
                            {group.name}
                          </option>
                        ))
                      ) : (
                        <option>No groups available</option>
                      )}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='emailSubject'>Subject:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='emailSubject'
                      onChange={(e) => setSubject(e.target.value)}
                      value={subject}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='emailMessage'>Message:</label>
                    <textarea
                      className='form-control'
                      id='emailMessage'
                      rows='8'
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    ></textarea>
                  </div>
                  <div className='email-card__actions'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={handleSubmit}
                      disabled={!subject || !group || !message}
                    >
                      Send <i className='fa-sharp fa-solid fa-paper-plane' />
                    </button>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      onClick={() => {
                        // Add logic to handle cancel action if needed
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <div className='template-option'>
                <TemplateOption handleTemplateOption={handleTemplateOption} />
              </div>
            </div>
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

export default Send;


