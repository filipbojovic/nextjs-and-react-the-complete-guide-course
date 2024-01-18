import Link from "next/link";

import classes from "./button.module.css";
import { ReactNode } from "react";

function Button(props: { link?: string; children: ReactNode }) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return <button className={classes.btn}>{props.children}</button>;
}

export default Button;
