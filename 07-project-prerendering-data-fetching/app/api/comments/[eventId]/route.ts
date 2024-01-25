// api/comments/an-id
import { connectDatabase, getAllDocuments, insertDocument } from "@/helpers/db-util";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type CommentDto = {
  email: string;
  name: string;
  text: string;
};

export type CommentModel = {
  id?: string;
  email: string;
  name: string;
  text: string;
  eventId?: string;
};

export async function POST(request: NextRequest, { params }: { params: { eventId: string } }) {
  // add server side validation
  const { email, name, text }: CommentDto = await request.json();
  const eventId: string = params.eventId;

  if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
    return new NextResponse(JSON.stringify({ message: "Invalid input!" }), {
      status: 422,
    });
  }

  const newComment: CommentModel = {
    email,
    name,
    text,
    eventId,
  };

  // database work
  const collectionName = "comments";
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Connecting to the database failed!" }), {
      status: 500,
    });
  }

  let result;
  try {
    result = await insertDocument(client!, collectionName, newComment);
    client!.close();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Inserting data failed! " + error }), {
      status: 500,
    });
  }

  newComment.id = result!.insertedId.toString();

  return new NextResponse<{ message: string; comment: CommentModel }>(
    JSON.stringify({ message: "Added comment", comment: newComment }),
    {
      status: 201,
    }
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
): Promise<NextResponse<CommentModel[]>> {
  const collectionName = "comments";

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Connecting to the database failed!" }), {
      status: 500,
    });
  }

  let result;
  const comments: CommentModel[] = [];
  try {
    result = await getAllDocuments(client!, collectionName);
    client.close();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Fetching documents failed! " + error }), {
      status: 500,
    });
  }

  result!.map((item) =>
    comments.push({
      id: item._id.toString(),
      email: item.email,
      name: item.name,
      text: item.text,
      eventId: item.eventId,
    })
  );

  return new NextResponse<CommentModel[]>(
    JSON.stringify({ message: "Added comment", comments: comments }),
    {
      status: 200,
    }
  );
}
