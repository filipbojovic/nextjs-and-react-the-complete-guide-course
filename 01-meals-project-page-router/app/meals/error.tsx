"use client";

type MealsErrorType = {
  error: Error & { digest?: string };
  reset: () => void;
};

// nextJs will automatically pass props to the component
export default function MealsError({ error, reset }: MealsErrorType) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>{error.message}</p>
    </main>
  );
}
