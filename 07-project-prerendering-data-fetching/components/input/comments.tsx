"use client";
import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { CommentDto, CommentModel } from "@/app/api/comments/[eventId]/route";
import NotificationContext from "@/store/notification-context";

function Comments(props: { eventId: string }) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const notificationCtx = useContext(NotificationContext);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      if (showComments) {
        setIsFetchingComments(true);
        const promiseRes = await fetch("/api/comments/" + eventId);
        const fetchedComments: { message: string; comments: CommentModel[] } =
          await promiseRes.json();

        setIsFetchingComments(false);
        setComments(fetchedComments.comments);
      }
    }

    fetchComments();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: CommentDto) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored",
      status: "pending",
    });

    const promiseRes = await fetch("/api/comments/" + eventId, {
      method: "post",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: { message: string } = await promiseRes.json();

    if (!promiseRes.ok) {
      notificationCtx.showNotification({
        title: "Error!",
        message: data.message,
        status: "error",
      });

      return;
    }

    notificationCtx.showNotification({
      title: "Success!",
      message: "Successfully registered the comment!",
      status: "success",
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList comments={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
