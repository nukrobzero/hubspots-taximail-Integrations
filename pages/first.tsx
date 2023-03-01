import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function First() {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [responseData, setResponseData] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!apiKey || !secretKey) {
      alert("Please enter both API Key and Secret Key.");
      return;
    }
    const dataForm = {
      apiKey,
      secretKey,
    };

    try {
      const response = await axios.post("/api/taximailLogin", dataForm);
      console.log("Your Session ID:", response.data.data.session_id);
      setResponseData(response.data.data.session_id);
      // handle successful response
    } catch (error) {
      alert('API Key or Secret Key incorrect');
      // handle error response
    }
  };

  return (
    <>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <h1>First Step</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="api_key">API Key:</label>
          <input
            type="text"
            id="api_key"
            value={apiKey}
            onChange={({ target }) => setApiKey(target?.value)}
          />
        </div>
        <div>
          <label htmlFor="secret_key">Secret Key:</label>
          <input
            type="text"
            id="secret_key"
            value={secretKey}
            onChange={({ target }) => setSecretKey(target?.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseData && (
        <div>
          <h3>Login Successfuly!</h3>
          <button>
            <Link href={`/create-list?sessionID=${responseData}`}>Next step</Link>
          </button>
        </div>
      )}
    </>
  );
}
