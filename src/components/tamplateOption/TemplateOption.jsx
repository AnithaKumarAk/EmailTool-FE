import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../auth/auth";
import "./templateOption.css";

function TemplateOption({ handleTemplateOption }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get("https://emailtool-be-1.onrender.com/api/v1/user/viewtemplates", config)
      .then((res) => {
        setTemplates(res.data.templates);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="card-temp">
        <h2 className="card-temp-title">Select Template</h2>
        <div className="card-temp-image">
          <img
            src="https://bloggingguide.com/wp-content/uploads/2021/06/newsletter-orange.png"
            alt="Template option"
          />
        </div>
        <div className="card-temp-select">
          <label htmlFor="select-option">Select Option:</label>
          <select
            id="select-option"
            onChange={(event) => handleTemplateOption(event.target.value)}
          >
            <option value="none">None</option>
            {templates.map((template) => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TemplateOption;
