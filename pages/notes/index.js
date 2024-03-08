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
  Spinner
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";
import fetcher from "@/utils/fetcher";
import useSWR from 'swr'

const LayoutComponent = dynamic(() => import("@/layout"))

export default function Notes() {

  // const { data, isLoading } = useQueries({
  //   prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/notes`
  // })

  const { data, error, isLoading } = useSWR(
    'https://paace-f178cafcae7b.nevacloud.io/api/notes',
    fetcher, {
    refreshInterval: 600, // every x sec, call API
    revalidateOnFocus: true, // focus ke tab browser => fetch API
  })

  const router = useRouter()
  const [notes, setNotes] = useState();

  // Read API response
  // useEffect(() => {
  //   async function fetchingData() {
  //     const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
  //     const listNotes = await res.json()
  //     setNotes(listNotes)
  //   }

  //   fetchingData();
  // }, [])

  const HandleDelete = async (id) => {
    try {
      const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`, {
        method: 'DELETE', headers: {
          "Content-Type": "application/json"
        }
      })
      const result = await res.json()
      console.log(result)

      if (result?.success) {
        router.reload()
      }
    } catch (error) {
      console.log(error)
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
              onClick={() => router.push("/notes/add")}>Add Notes</Button>
          </Flex>
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
                    // notes?.data?.map((item) => (
                    data?.data?.map((item) => (
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
                            <Button flex='1' variant='solid' onClick={() => router.push(`/notes/edit/${item?.id}`)}>
                              Edit
                            </Button>
                            <Button flex='1' variant='solid' colorScheme='red' onClick={() => HandleDelete(item?.id)}>
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
        </Box>
      </LayoutComponent>
    </>
  );
}

// paace-f178cafcae7b.nevacloud.io/api/docs

// export async function getStaticProps() {
//   const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
//   const notes = await res.json()
//   return { props: { notes }, revalidate: 10 } // rebuild every 10 seconds
// }
