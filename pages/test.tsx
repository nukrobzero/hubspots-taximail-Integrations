import axios from "axios";
import { useEffect, useState } from "react";

export default function Test() {
  const listID = "1";
  const sessionID = "bede8bb96d65f2456c2692fcbdd524b5";
  const [data, setData] = useState([]);
  const allData = {
    sessionID,
    listID,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`/api/customFields/get`, allData);
      const resData = response.data;
      setData(resData.data.custom_fields);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>Test</h1>
      <ul>
        <h3>Have Fields</h3>
        {data &&
          data.map((d: any, idx: any) => (
            <li key={idx}>
              FieldsName: {d.show_custom_name} <br />
              FieldKey: {d.custom_field_key}
            </li>
          ))}
      </ul>
    </>
  );
}
