import React from "react";
import "./mailList.css";

function MailList({ data }) {
  const formatDate = (d) => {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <table className="fl-table">
        <thead>
          <tr>
            <th>Sl.No.</th>
            <th>Group</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              <td>{item.groupId ? item.groupId.name : 'No Group'}</td>
              <td>{item.subject}</td>
              <td>{item.message}</td>
              <td>{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MailList;
