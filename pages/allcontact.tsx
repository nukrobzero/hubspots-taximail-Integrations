import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface FormData {
  TAXI_MAIL_SESSION_ID: string;
  listId: string;
  HUBSPOT_KEY: string;
}

interface TaximailResponse {
  key_import: string;
  token: string;
  data: any;
}

export default function Allcontacts({}: FormData) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { sessionID, listID } = router.query;
  const [formData, setFormData] = useState({
    TAXI_MAIL_SESSION_ID: sessionID,
    listId: listID,
    HUBSPOT_KEY: "",
  });
  const [responseData, setResponseData] = useState<TaximailResponse | null>(
    null
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.TAXI_MAIL_SESSION_ID ||
      !formData.listId ||
      !formData.HUBSPOT_KEY
    ) {
      alert("Please enter all input.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/all/all", formData);
      console.log(response.data);
      setResponseData(response.data);
      setIsLoading(false);
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
      {isLoading && <p>Loading...</p>}
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <h1>Import All from Hubspot</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="HUBSPOT_KEY">Your HUBSPOT KEY:</label>
          <input
            type="text"
            id="HUBSPOT_KEY"
            value={formData.HUBSPOT_KEY}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="TAXI_MAIL_SESSION_ID">
            Your TAXIMAIL SESSION ID:
          </label>
          <input
            type="text"
            id="TAXI_MAIL_SESSION_ID"
            value={formData.TAXI_MAIL_SESSION_ID}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="listId">Your list ID:</label>
          <input
            type="text"
            id="listId"
            value={formData.listId}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseData && (
        <div>
          <h4>Contact info created successful!</h4>
          <button>
            <Link href="/">Finshed</Link>
          </button>
        </div>
      )}
    </>
  );
}
