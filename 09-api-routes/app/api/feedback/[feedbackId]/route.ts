import { NextResponse } from "next/server";
import { FeedbackDto, filePath } from "../route";
import { GET as getExistingFeedbacks } from "../route";

export async function GET(request: Request, { params }: { params: { feedbackId: string } }) {
  const feedbackId: string = params.feedbackId;

  const { feedback }: { feedback: FeedbackDto[] } = await (await getExistingFeedbacks()).json();
  const selectedFeedback = feedback.find((fb) => fb.id === feedbackId);

  return NextResponse.json({ feedback: selectedFeedback }, { status: 200 });
}
