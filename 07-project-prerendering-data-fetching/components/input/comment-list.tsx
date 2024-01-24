import { CommentModel } from "@/app/api/comments/[eventId]/route";
import classes from "./comment-list.module.css";

type CommentListProps = {
  comments: CommentModel[];
};
function CommentList({ comments }: CommentListProps) {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </ul>
  );
}

export default CommentList;
