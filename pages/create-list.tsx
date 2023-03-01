import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface FormData {
  taxi_mail_session_id: string;
}

interface TaximailResponse {
  list_id: string;
  data: any;
}

export default function CreateLists({}: FormData) {
  const router = useRouter();
  const { sessionID } = router.query;
  const [formData, setFormData] = useState({
    taxi_mail_session_id: sessionID,
  });
  const [responseData, setResponseData] = useState<TaximailResponse | null>(
    null
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.taxi_mail_session_id) {
      alert("Please enter sessionID.");
      return;
    }
    try {
      const response = await axios.post(
        "/api/importListContactsTaxi",
        formData
      );
      setResponseData(response.data);
      // handle successful response
    } catch (error) {
      alert("SESSION ID incorrect. Please try again!");
      return;
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
      <h1>CreateList TaxiMail</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taxi_mail_session_id">Your SESSION ID:</label>
          <input
            type="text"
            id="taxi_mail_session_id"
            value={formData.taxi_mail_session_id}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      {responseData && (
        <div>
          <h4>list ID created successful!</h4>
          <h4>Your list ID: {responseData?.data.list_id}</h4>
          <button>
            <Link href={`/second/${sessionID}`}>Next step</Link>
          </button>
        </div>
      )}
    </>
  );
}
