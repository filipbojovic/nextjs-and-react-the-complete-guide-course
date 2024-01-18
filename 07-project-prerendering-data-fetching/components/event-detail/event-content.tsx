import { ReactNode } from "react";
import classes from "./event-content.module.css";

function EventContent(props: { children: ReactNode }) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
