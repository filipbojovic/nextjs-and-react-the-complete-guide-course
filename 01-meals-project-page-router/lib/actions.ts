"use server";

import { MealModel } from "@/components/meals/meal-item";

export async function shareMeal(formData: FormData) {

  const meal: MealModel = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as string,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  console.log(meal);
}
