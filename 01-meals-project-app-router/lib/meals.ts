import fs from "node:fs";
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

export async function saveMeal(meal: MealModel) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.imageFile!.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const path: string = `public/images/${fileName}`;
  const stream = fs.createWriteStream(path);
  const bufferedImage = await meal.imageFile!.arrayBuffer();

  // the second arg is function which should be executed once the writing is done
  // err will be null if everything is fine
  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
  INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}
