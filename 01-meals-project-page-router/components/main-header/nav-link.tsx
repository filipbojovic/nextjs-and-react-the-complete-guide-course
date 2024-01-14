"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const path: string = usePathname();

  return (
    <Link
      href={href}
      className={path.startsWith(href) ? `${classes.link} ${classes.active}` : `${classes.link}`}
    >
      {children}
    </Link>
  );
}
