import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  session_id: string;
}

export default function Second({ session_id }: FormData) {
  console.log(session_id);
  const [responseData, setResponseData] = useState(null);
  const handleClick = async () => {
    try {
      const response = await axios.post(
        `/api/getListTaxi?TAXI_MAIL_SESSION_ID=${session_id}`
      );
      console.log("Your Session ID:", response.data);
      setResponseData(response.data);
      // handle successful response
    } catch (error) {
      console.error(error);
      // handle error response
    }
  };

  return (
    <>
      <h4>The session id is: {session_id}</h4>
      <button onClick={handleClick}>List Data</button>

      {responseData && (
        <div>
          <h4>Response Data:</h4>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      <button>
        <Link href="/third">Next step (add single contact)</Link>
      </button>
      <button>
        <Link href="/allcontact">Next step (add All contact)</Link>
      </button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { session_id } = query;
  return {
    props: {
      session_id: session_id || "",
    },
  };
};
