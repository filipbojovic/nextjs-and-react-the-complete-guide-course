"use client";
import { useState } from "react";
import { FeedbackDto, GET } from "../api/feedback/route";

/*
This file by using one of the following ways:
  1. use useEffect hook and remove async keyword from functions
  2. separte the whole component into two: client and server
 */

export default async function FeedbackPage() {
  const [feedbackData, setFeedbackData] = useState<FeedbackDto>();

  function loadFeedbackHandler(id: string) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data: { feedback: FeedbackDto }) => {
        setFeedbackData(data.feedback);
      });
  }

  const { feedback }: { feedback: FeedbackDto[] } = await loadFeedbacks();

  return (
    <>
      {feedbackData && <p>{feedback.email}</p>}
      <ul>
        {feedback.map((item) => (
          <li key={item.id}>
            {item.feedback}
            <button onClick={loadFeedbackHandler.bind(null, item.id!)}>Show Details</button>
          </li>
        ))}
      </ul>
    </>
  );
}

async function loadFeedbacks() {
  return (await GET()).json();
}
