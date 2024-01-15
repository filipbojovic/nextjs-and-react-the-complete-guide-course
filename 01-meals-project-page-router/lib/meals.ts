import { MealModel } from "@/components/meals/meal-item";
import sql, { Database } from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db: Database = sql("meals.db");

export async function getMeals(): Promise<MealModel[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate an action that lasts 2s
  // throw new Error("Loading meals failed!");
  return db.prepare("SELECT * FROM meals").all() as MealModel[];
}

export function getMeal(slug: string): MealModel {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as MealModel;
}

export function saveMeal(meal: MealModel) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}
