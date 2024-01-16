"use client";
import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import { useFormState } from "react-dom";
import MealsFormSubmitButton from "@/components/meals/meals-form-submit";

export type ShareMealPageState = {
  message: string | null;
};

export default function ShareMealPage() {
  // currentState will be an object with property 'message' whose value might be 'string' or null.
  // string because of the possible errors which can occurr in shareMeal method
  // 'shareMeal' method must be tweaked in order to be used with 'useFOrmState' hook
  const [currentState, formAction] = useFormState<ShareMealPageState, FormData>(shareMeal, {
    message: null,
  });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" rows={10} required></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {currentState.message && <p>{currentState.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmitButton />
          </p>
        </form>
      </main>
    </>
  );
}
