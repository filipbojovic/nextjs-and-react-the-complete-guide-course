import { MealItemType } from "@/components/meals/meal-item";
import sql, { Database } from "better-sqlite3";

const db: Database = sql("meals.db");

export async function getMeals(): Promise<MealItemType[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate an action that lasts 2s
  return db.prepare("SELECT * FROM meals").all() as MealItemType[];
}
