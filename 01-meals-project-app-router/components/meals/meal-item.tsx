import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";

export type MealModel = {
  id?: string;
  title: string;
  slug?: string;
  image?: string;
  imageFile?: File; // it is used only in a request (Dto only)
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export default function MealItem({ id, title, slug, image, summary, creator }: MealModel) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image!} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
