import Button from "../ui/button";
import classes from "./results-title.module.css";

type ResultsTitleProps = {
  date: Date;
};

function ResultsTitle(props: ResultsTitleProps) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
