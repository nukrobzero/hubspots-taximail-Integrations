import axios from "axios";
import { useEffect, useState } from "react";

export default function DeleteTaxidata() {
  const [listID, setListID] = useState("");
  const [sessionID, setSessionID] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.delete(
        `https://api.taximail.com/v2/list/${listID}/subscribers/selection/${sessionID}`
      );
    };
  }, []);

  const HandelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
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
    </>
  );
}
