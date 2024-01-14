import MealItem, { MealItemType } from "./meal-item";
import classes from "./meals-grid.module.css";

type MealsGridProps = {
  meals: MealItemType[];
};

export default function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
