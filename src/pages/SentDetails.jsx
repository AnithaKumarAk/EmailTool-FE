import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../auth/auth";
import MailList from "../components/mailList/MailList";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navabr";

function SentDetails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get("https://emailtool-be-1.onrender.com/api/v1/user/sentdetails", config)
      .then((res) => {
        console.log(res.data.mails);
        setData(res.data.mails);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className='container'>
        <Sidebar />
        <Navbar />
        <section className='home'>
          <div style={{ marginTop: "100px", padding: "20px" }}>
            <MailList data={data} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default SentDetails;