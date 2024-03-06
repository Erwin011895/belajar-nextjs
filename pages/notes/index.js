import dynamic from "next/dynamic";
import Link from "next/link"

const LayoutComponent = dynamic(() => import("@/layout"))

export default function Notes({ notes }) {
  console.log(notes.data)
  return (
    <>
      <LayoutComponent metaTitle="Notes">{
        notes.data.map((item) => (
          <div style={{ border: "1px solid grey", marginBottom: "5px" }}>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>
        ))
      }</LayoutComponent>
    </>
  );
}

// paace-f178cafcae7b.nevacloud.io/api/docs
export async function getStaticProps() {
  const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
  const notes = await res.json()
  return { props: { notes }, revalidate: 10 } // rebuild every 10 seconds
}


