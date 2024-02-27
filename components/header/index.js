import { withAuth } from "../with-auth"
import styles from "./styles.module.css"
import Link from "next/link"

function Header() {
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
    </ul>
  </div>
}

export default withAuth(Header)
