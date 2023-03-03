import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DeleteTaxidata() {
  const [listID, setListID] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [responseData, setresponseData] = useState("");

  const HandelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataRes = {
      sessionID,
      listID,
    };

    if (!sessionID || !listID) {
      alert("Please input Session ID or List ID");
      return;
    }
    try {
      const response = await axios.post(`/api/deletecontactTaximail`, dataRes);
      setresponseData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <h1>Delete All Data Contacts on Taximail</h1>
      <form onSubmit={HandelSubmit}>
        <div>
          <label htmlFor="sessionID">Session ID:</label>
          <input
            type="text"
            id="sessionID"
            value={sessionID}
            onChange={({ target }) => setSessionID(target?.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="listID">List ID:</label>
          <input
            type="text"
            id="listID"
            value={listID}
            onChange={({ target }) => setListID(target?.value)}
          />
        </div>
        <br />
        <button type="submit">Delete</button>
      </form>
      {responseData && <h2>Contact is Deleted!</h2>}
    </>
  );
}
