import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"))

export default function DetailNotes({ notes }) {
  console.log(notes.data)
  return (
    <>
      <LayoutComponent metaTitle="Notes">{
        <div>
          <p>title: {notes.data.title}</p>
          <p>description: {notes.data.description}</p>
          <p>updated_at: {notes.data.updated_at}</p>
        </div>
      }</LayoutComponent>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
  const notes = await res.json()

  const paths = notes.data.map((item) => ({
    params: {
      id: item.id
    }
  }))
  return {
    paths,
    fallback: false, // false or "blocking"
  }
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`)
  const notes = await res.json()
  return { props: { notes }, revalidate: 10 } // rebuild every 10 seconds
}
