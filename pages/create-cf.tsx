import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateCF() {
  const router = useRouter();
  const { sessionID, listID } = router.query;
  const [responsehaveClick, setresponsehaveClick] = useState("");
  const [checkReloads, setcheckReloads] = useState("1");
  console.log(checkReloads);
  const fieldsData = {
    sessionID,
    listID,
  };
  useEffect(() => {
    window.onbeforeunload = function () {
      return setcheckReloads("");
    };
    setcheckReloads("1");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sessionID || !listID) {
      alert("No sessionID or listID.");
      return;
    }

    try {
      const response = await axios.post("/api/customFields/post", fieldsData);
      setresponsehaveClick(response.data);
      console.log(response.data);
      // handle successful response
    } catch (error) {
      alert("Someting went wrong");
      return;
      // handle error response
    }
  };

  return (
    <>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <h1>CreateCustomFields TaxiMail</h1>
      <div>
        <h3>Seesion ID: {sessionID}</h3>
        <h4>List ID: {listID}</h4>
      </div>

      {checkReloads && (
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Create Fields</button>
          </form>
          {responsehaveClick && (
            <h1>CustomFields created sucessfuly!</h1>
          )}
          <h4>ฺBut have CustomFields created</h4>
          <button>
            <Link href={`/third?sessionID=${sessionID}&listID=${listID}`}>
              Next step (add single contact)
            </Link>
          </button>
          <button>
            <Link href={`/allcontact?sessionID=${sessionID}&listID=${listID}`}>
              Next step (add All contact)
            </Link>
          </button>
        </div>
      )}
    </>
  );
}
