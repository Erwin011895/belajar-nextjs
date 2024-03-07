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
import { useMutations } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"))


export default function AddNotes() {
  const { mutate } = useMutations();
  const router = useRouter()
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const HandleSubmit = async () => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes`,
      method: "POST",
      payload: notes
    })

    if (response?.success) {
      router.push("/notes");
    } else {
      console.log(response);
    }

    // call API create note
    // try {
    //   const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes', {
    //     method: 'POST', headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(notes),
    //   })
    //   const result = await res.json()
    //   console.log(result)

    //   if (result?.success) {
    //     router.push("/notes");
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin={5} padding={5}>
          <Heading>Add Notes</Heading>
          <Grid gap={5}>
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                onChange={(event) => setNotes({ ...notes, title: event.target.value })} />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })} />
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
