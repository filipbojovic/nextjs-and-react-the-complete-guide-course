import { Fragment, ReactNode, useContext } from "react";

import MainHeader from "./main-header";
import Notification from "../notification/notification";

function Layout(props: { children: ReactNode }) {
  // useContext

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <Notification message="Testing" status="pending" title="Notification" />
    </Fragment>
  );
}

export default Layout;
