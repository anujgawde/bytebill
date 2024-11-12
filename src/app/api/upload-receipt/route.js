import { NextResponse } from "next/server"; // Use Next.js response helpers
import { Readable } from "stream";

export async function POST(req, res) {
  try {
    // const readStream = Readable.from(req.body.receipt.buffer);
    // const poller = await this.client.beginAnalyzeDocument(
    //   "prebuilt-receipt",
    //   readStream
    // );
    // const extractedData = await poller.pollUntilDone();
    // return NextResponse.json({});
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
