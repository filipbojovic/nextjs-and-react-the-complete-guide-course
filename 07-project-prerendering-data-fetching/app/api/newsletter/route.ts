import { NextRequest, NextResponse } from "next/server";
import { connectDatabase, insertDocument } from "@/helpers/db-util";

type NewsletterDto = {
  email: string;
};

export async function POST(request: NextRequest) {
  const body: NewsletterDto = await request.json();
  const userEmail = body.email;

  if (!userEmail || !userEmail.includes("@")) {
    return new NextResponse(JSON.stringify({ message: "Invalid email address" }), {
      status: 422,
    });
  }

  // database work
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Connecting to the database failed!" }), {
      status: 500,
    });
  }

  try {
    await insertDocument(client!, "newslttter", { email: userEmail });
    client!.close();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Inserting data failed!" }), {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify({ message: "Signed up!" }), {
    status: 201,
  });
}
