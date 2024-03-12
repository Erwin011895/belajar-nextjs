import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
// import Menu from "../menu"
import { withAuth } from "../with-auth"
import styles from "./styles.module.css"
import Link from "next/link"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import { useQueries } from "@/hooks/useQueries"
import Cookies from "js-cookie"
import { useMutations } from "@/hooks/useMutation"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "@/context/userContext"

function Header() {
  const { mutate } = useMutations()
  const router = useRouter()
  const userData = useContext(UserContext)

  // const { data, isLoading, isError } = useQueries({
  //   prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
  //   headers: {
  //     "Authorization": `Bearer ${Cookies.get('user_token')}`
  //   },
  // });

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${Cookies.get('user_token')}`
      }
    })

    if (!response?.success) {
      console.log('gagal logout', response)
    } else {
      Cookies.remove('user_token')
      router.push('/login')
    }
  }

  return <div className={styles.header}>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/profile">Profile</Link>
      </li>
      <li>
        <Link href="/users">Users</Link>
      </li>
      <li>
        <Link href="/notes">Notes</Link>
      </li>
      <li>
        <Link href="/posts">Posts</Link>
      </li>
      <li>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {/* {data?.data?.name} */}
            {userData?.name}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => HandleLogout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </li>
    </ul>
  </div>
}

export default withAuth(Header)
