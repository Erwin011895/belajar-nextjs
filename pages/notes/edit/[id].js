import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layout"))

export default function EditNotes() {
  const router = useRouter();
  const { id } = router?.query;
  const [notes, setNotes] = useState();

  useEffect(() => {
    async function fetchingData() {
      const resp = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`,
      )
      const notes = await resp.json()

      if (notes?.success) {
        setNotes(notes.data)
      }
    }
    fetchingData();
  }, [id])

  console.log('notes', notes)

  const HandleSubmit = async () => {
    try {
      const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`, {
        method: 'PATCH', headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: notes.title,
          description: notes.description,
        }),
      })
      const result = await res.json()
      console.log(result)

      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin={5} padding={5}>
          <Heading>Edit Notes</Heading>
          <Grid gap={5}>
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                value={notes?.title || ""}
                onChange={(event) => setNotes({ ...notes, title: event.target.value })} />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea
                onChange={(event) => setNotes({ ...notes, description: event.target.value })}
                value={notes?.description || ""} />
            </GridItem>
            <GridItem>
              <Button
                colorScheme='blue'
                onClick={() => HandleSubmit()}>Submit</Button>
            </GridItem>
          </Grid>

        </Card>
      </LayoutComponent>
    </>
  );
}
