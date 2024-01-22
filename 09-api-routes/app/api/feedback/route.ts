import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const filePath: string = path.join(process.cwd(), "data", "feedback.json");

export type FeedbackDto = {
  id?: string;
  email: string;
  feedback: string;
};

// To handle a GET request to /api
export async function GET() {
  const fileData = fs.readFileSync(filePath, "utf-8");
  const existingData: FeedbackDto[] = JSON.parse(fileData);

  return NextResponse.json({ feedback: existingData }, { status: 200 });
}

export async function POST(request: Request) {
  const data: FeedbackDto = await request.json();

  const newFeedback: FeedbackDto = {
    id: new Date().toISOString(),
    email: data.email,
    feedback: data.feedback,
  };

  // get existing data
  const fileData = fs.readFileSync(filePath, "utf-8");
  const existingData: FeedbackDto[] = JSON.parse(fileData);

  // save new data
  existingData.push(newFeedback);
  fs.writeFileSync(filePath, JSON.stringify(existingData));

  return NextResponse.json(newFeedback, { status: 201 });
}
