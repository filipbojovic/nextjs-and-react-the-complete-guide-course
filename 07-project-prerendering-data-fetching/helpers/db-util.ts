import { MongoClient } from "mongodb";

const dbName = "events";

export async function connectDatabase(): Promise<MongoClient> {
  const client = await MongoClient.connect(
    `mongodb+srv://fikacomments:fikacomments@cluster0.zlwk2qy.mongodb.net/${dbName}?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(client: MongoClient, collection: string, document: any) {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client: MongoClient, collection: string) {
  const db = client.db();
  const result = await db.collection(collection).find().sort({ _id: -1 }).toArray();

  return result;
}
