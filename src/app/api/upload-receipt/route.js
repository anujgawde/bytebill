import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";
import { NextResponse } from "next/server"; // Use Next.js response helpers
import { Readable } from "stream";

const client = new DocumentAnalysisClient(
  process.env.AZURE_FORM_RECOGNIZER_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_FORM_RECOGNIZER_KEY)
);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file"); // assuming the field name is "file"

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const readStream = Readable.from(buffer);

    const poller = await client.beginAnalyzeDocument(
      process.env.AZURE_FORM_RECOGNIZER_MODEL,
      readStream
    );
    const extractedData = await poller.pollUntilDone();
    return NextResponse.json(extractedData.documents[0]);
  } catch (error) {
    console.error(
      "Error creating link token:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to create link token" },
      { status: 500 }
    );
  }
}
