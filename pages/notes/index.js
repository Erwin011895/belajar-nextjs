import dynamic from "next/dynamic";
import {
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Box,
  Spinner,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";
import fetcher from "@/utils/fetcher";
import useSWR from 'swr'
import { callNotesAPI } from "../api/notes";

const LayoutComponent = dynamic(() => import("@/layout"))

export default function Notes({ notes }) {
  const router = useRouter()
  let isLoading = false;

  // const { notes, error, isLoading } = useSWR(
  //   'https://paace-f178cafcae7b.nevacloud.io/api/notes',
  //   fetcher, {
  //   refreshInterval: 600, // every x sec, call API
  //   revalidateOnFocus: true, // focus ke tab browser => fetch API
  // })

  // const [notes, setNotes] = useState();

  // const { notes, isLoading } = useQueries({
  //   prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/notes`
  // })

  // // Read API response
  // useEffect(() => {
  //   async function fetchingData() {
  //     const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
  //     const listNotes = await res.json()
  //     setNotes(listNotes)
  //   }

  //   fetchingData();
  // }, [])

  // Modal functions
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState({
    title: '',
    description: '',
  })
  const [modalContent, setModalContent] = useState({
    header: '',
    text: '',
    colorScheme: 'blue',
    onClick: () => { },
    actionText: '',
    showInput: false,
  })

  // DELETE
  const HandleDeleteConfirm = (note) => {
    setModalContent({
      header: "Are you sure to delete this notes?",
      text: note?.title,
      colorScheme: 'red',
      onClick: () => HandleDelete(note?.id),
      actionText: "Delete",
      showInput: false,
    })

    onOpen()
  }

  const HandleDelete = async (id) => {
    try {
      const result = await callNotesAPI({
        urlPostfix: `/delete/${id}`,
        method: 'DELETE',
      })
      console.log(result)

      if (result?.success) {
        router.reload()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedNote({
        title: '',
        description: '',
      });
    }
  }


  // ADD
  const inputRefTitle = useRef(null)
  const inputRefDesc = useRef(null)
  const HandleAddBtn = () => {
    setSelectedNote({
      title: '',
      description: '',
    })
    setModalContent({
      header: "Add new note",
      text: '',
      colorScheme: 'blue',
      onClick: () => HandleAdd(),
      actionText: "Add new",
      showInput: true,
    })

    onOpen()
  }

  const HandleAdd = async () => {
    console.log('inputRefTitle', inputRefTitle.current?.value)
    console.log('inputRefDesc', inputRefDesc.current?.value)

    try {
      const result = await callNotesAPI({
        urlPostfix: ``,
        method: 'POST',
        bodyData: {
          title: inputRefTitle.current?.value,
          description: inputRefDesc.current?.value
        },
      })
      console.log(result)

      if (result?.success) {
        router.reload()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedNote({
        title: '',
        description: '',
      });
    }
  }

  // EDIT
  const HandleEditBtn = async (note) => {
    setSelectedNote(note)
    setModalContent({
      header: "Edit note",
      text: '',
      colorScheme: 'blue',
      onClick: () => HandleEdit(note?.id),
      actionText: "Update",
      showInput: true,
    })

    onOpen()
  }

  const HandleEdit = async (id) => {
    try {
      const result = await callNotesAPI({
        urlPostfix: `/update/${id}`,
        method: 'PATCH',
        bodyData: {
          id: id,
          title: inputRefTitle.current?.value,
          description: inputRefDesc.current?.value
        },
      })
      console.log(result)

      if (result?.success) {
        router.reload()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedNote({
        title: '',
        description: '',
      });
    }
  }

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {/* {
        notes.data.map((item) => (
          <div style={{ border: "1px solid grey", marginBottom: "5px" }}>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>
        ))
      } */}

        <Box padding={5}>
          <Flex justifyContent='end'>
            <Button
              colorScheme="blue"
              // onClick={() => router.push("/notes/add")}>
              onClick={() => {
                HandleAddBtn()
              }}>
              Add Notes
            </Button>
            {selectedNote?.id} <br />
            {selectedNote?.title} <br />
            {selectedNote?.description}
          </Flex>
          {/* start isLoading */}
          {
            isLoading ? (<Flex alignItems='center' justifyContent='center'>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Flex>) : (
              <Flex>
                <Grid templateColumns='repeat(5, 1fr)' gap={5}>
                  {
                    notes?.data?.map((item) => (
                      <GridItem key={item?.id}>
                        <Card>
                          <CardHeader>
                            <Heading>{item?.title}</Heading>
                          </CardHeader>
                          <CardBody>
                            <Text>{item?.description}</Text>
                          </CardBody>
                          <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                          >
                            {/* <Button flex='1' variant='solid' onClick={() => router.push(`/notes/edit/${item?.id}`)}> */}
                            <Button flex='1' variant='solid' onClick={() => HandleEditBtn(item)}>
                              Edit
                            </Button>
                            {/* <Button flex='1' variant='solid' colorScheme='red' onClick={() => HandleDelete(item?.id)}> */}
                            <Button flex='1' variant='solid' colorScheme='red' onClick={() => HandleDeleteConfirm(item)}>
                              Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      </GridItem>
                    ))
                  }
                </Grid>
              </Flex>
            )
          } {/* end isLoading */}

          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              <ModalHeader>{modalContent?.header}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>{modalContent?.text}</Text>
                {<Grid gap={5} hidden={!modalContent.showInput}>
                  <GridItem>
                    <Text>Title</Text>
                    <Input
                      type="text"
                      ref={inputRefTitle}
                      value={selectedNote?.title}
                      onChange={(event) => setSelectedNote({ ...selectedNote, title: event.target.value })} />
                  </GridItem>
                  <GridItem>
                    <Text>Description</Text>
                    <Textarea
                      ref={inputRefDesc}
                      value={selectedNote?.description}
                      onChange={(event) => setSelectedNote({ ...selectedNote, description: event.target.value })} />
                  </GridItem>
                </Grid>}
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme={modalContent.colorScheme} onClick={modalContent.onClick}>{modalContent.actionText}</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </LayoutComponent>
    </>
  );
}

export async function getStaticProps() {
  const notes = await callNotesAPI()
  return { props: { notes }, revalidate: 10 }
}

// paace-f178cafcae7b.nevacloud.io/api/docs
// Tutorial getStaticProps
// export async function getStaticProps() {
//   const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
//   const notes = await res.json()
//   return { props: { notes }, revalidate: 10 } // rebuild every 10 seconds
// }
