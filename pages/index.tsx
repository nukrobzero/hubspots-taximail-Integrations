import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hub spot Integrations Taximail Tools (Contact Only)</h1>
      <div>
        <h4>First Integrations Follow step below</h4>
        <Link href="/first">Installation</Link>
        <p>*It takes more than 20 minutes if there is a lot of information.</p>
      </div>
      <div>
        <h4>Delete All Data Contacts on Taximail</h4>
        <Link href="/deleteAll">Click</Link>
      </div>
    </>
  );
}
