"use client";
import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { CommentDto, CommentModel } from "@/app/api/comments/[eventId]/route";

function Comments(props: { eventId: string }) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    async function fetchComments() {
      if (showComments) {
        const promiseRes = await fetch("/api/comments/" + eventId);
        const fetchedComments: { message: string; comments: CommentModel[] } =
          await promiseRes.json();

        setComments(fetchedComments.comments);
      }
    }

    fetchComments();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: CommentDto) {
    const promiseRes = await fetch("/api/comments/" + eventId, {
      method: "post",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: CommentModel = await promiseRes.json();
    console.log(data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
