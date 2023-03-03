import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";

interface ResponseData {
  secondID: string;
  resData: any;
}

export default function Second({ secondID, resData }: ResponseData) {
  const [sessionID, setSessionID] = useState(secondID);
  const [listId, setListId] = useState(resData.data.lists[0].list_id);

  const handleListIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListId(event.target.value);
  };
  return (
    <>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <div>
        <label htmlFor="sessionID">Session id:</label>
        <input
          type="text"
          id="sessionID"
          value={sessionID}
          onChange={({ target }) => setSessionID(target?.value)}
        />
      </div>
      <div>
        <h4>All List:</h4>
        <select value={listId} onChange={handleListIdChange}>
          {resData.data.lists?.map((data: any) => (
            <option key={data.list_id} value={data.list_id}>
              {data.list_name} (ID:{data.list_id})
            </option>
          ))}
        </select>
      </div>
      <br />
      <button>
        <Link href={`/third?sessionID=${sessionID}&listID=${listId}`}>
          Next step (add single contact)
        </Link>
      </button>
      <button>
        <Link href={`/allcontact?sessionID=${sessionID}&listID=${listId}`}>
          Next step (add All contact)
        </Link>
      </button>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const secondID = params.secondID;
  const response = await fetch("https://api.taximail.com/v2/list/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secondID}`,
    },
  });
  const resData = await response.json();
  return {
    props: { secondID, resData },
    revalidate: 1,
  };
};
