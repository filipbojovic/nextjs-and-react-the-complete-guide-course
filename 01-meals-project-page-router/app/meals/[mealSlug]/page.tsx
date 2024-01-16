import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { MealModel } from "@/components/meals/meal-item";
import { notFound } from "next/navigation";

type MealDetailsProps = {
  params: {
    mealSlug: string;
  };
};

// must be called like this because nextJs automatically looks for functions with this name
// if static metadata doesn't exist
// this functions receives the same data the main function MealDetailsPage receives
export async function generateMetadata({ params }: MealDetailsProps) {
  const meal: MealModel = getMeal(params.mealSlug);

  // metadata function is executed before the main function below
  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }: MealDetailsProps) {
  const meal: MealModel = getMeal(params.mealSlug);

  if (!meal) {
    // if meal is undefined (notfound), show the closest not-found page in the project
    notFound(); // this will stop this component form executing and find the closest not found page
  }

  // replace \n with <br> in the HTML code (instructions are html code)
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image!} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/* instructions are HTML code and therefore we need  dangerouslySetInnerHTML prop*/}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions, //html code which should be outputed on the screen
          }}
        ></p>
      </main>
    </>
  );
}
