import Link from "next/link";
import style from "./index.module.scss"
export default function Home() {
  return <>
    <div className={style.container_page}>
      <Link className={style.link} href={"/auth"}>ورود</Link>
    </div>
  </>;
}
