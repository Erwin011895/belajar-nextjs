import { useMutations } from "@/hooks/useMutation"
import { Button, Flex, FormControl, Heading, Input, Stack, useToast } from "@chakra-ui/react"
import { useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

// This function can be marked `async` if using `await` inside
export default function Login() {
  const router = useRouter()
  const { mutate } = useMutations()
  const toast = useToast()
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  })

  const HandleSubmit = async () => {
    console.log('hs', payload)
    const response = await mutate({ url: "https://paace-f178cafcae7b.nevacloud.io/api/login", payload })
    console.log('hs', response)

    if (!response?.success) {
      toast({
        title: "Login gagal",
        description: "email dan password tidak sesuai",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    } else {
      Cookies.set('user_token', response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: '/'
      })
      router.push('/')
    }
  }

  return (<Flex alignItems='center' justifyContent='center'>
    <Stack direction='column'>
      <Heading as="h4">LOGIN</Heading>
      <FormControl>
        <Input value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value })} placeholder="email" />
      </FormControl>
      <FormControl>
        <Input value={payload.password} onChange={(e) => setPayload({ ...payload, password: e.target.value })} placeholder="password" type='password' />
      </FormControl>
      <FormControl>
        <Button onClick={HandleSubmit}>Login</Button>
      </FormControl>
    </Stack>
  </Flex>)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}

/*
rehan@mail.com
12345
*/