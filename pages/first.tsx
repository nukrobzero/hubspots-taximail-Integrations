import axios from "axios";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  api_key: string;
  secret_key: string;
}

interface TaximailResponse {
  session_id: string;
  status: string;
  message: string;
  data: any;
}

export default function First({}: FormData) {
  const [formData, setFormData] = useState({
    api_key: "",
    secret_key: "",
  });
  const [responseData, setResponseData] = useState<TaximailResponse | null>(
    null
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/taximailLogin", formData);
      console.log("Your Session ID:", response.data.data.session_id);
      setResponseData(response.data);
      // handle successful response
    } catch (error) {
      console.error(error);
      // handle error response
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
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
            value={formData.api_key}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="secret_key">Secret Key:</label>
          <input
            type="text"
            id="secret_key"
            value={formData.secret_key}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseData && (
        <div>
          <h4>Login successful!</h4>
          <h4>Your Session ID: {responseData?.data.session_id}</h4>
          <p>Copy Your Session ID for next step</p>
          <button>
            <Link href={`/second?session_id=${responseData?.data.session_id}`}>Next step</Link>
          </button>
        </div>
      )}
    </>
  );
}
