// import Layout from "@/layout";
import { useEffect } from "react";
// import Image from "next/image";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"))

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log('response ', res))
      .catch((err) => console.log('err ', err))
  })

  return (
    <>
      <LayoutComponent metaTitle="Home">
        <div>Home</div>

        {/* Belajar next/image */}
        {/* <Image src="/thumbsup.png" width={400} height={400} alt="thumbs up image" /> */}
        {/* <img src="/thumbsup.png" style={{ width: 400, height: 400 }} alt="thumbs up image" /> */}
      </LayoutComponent>
    </>
  );
}
