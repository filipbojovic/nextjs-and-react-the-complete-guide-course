"use server";

import { MealModel } from "@/components/meals/meal-item";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { ShareMealPageState } from "@/app/meals/share/page";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

// prevState is not used, but it is necessary because this method is used inside useFormState hook
export async function shareMeal(
  prevState: ShareMealPageState,
  formData: FormData
): Promise<ShareMealPageState> {
  const meal: MealModel = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    imageFile: formData.get("image") as File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (isInvalidText(meal.title) || isInvalidText(meal.summary)) {
    // it is important that a serializable object is returned! e.g. methods would be
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);

  // tells the next to revalidate cache around certain path and by DEFAULT only specified path will be revalidated
  revalidatePath("/meals");

  redirect("/meals");
}
