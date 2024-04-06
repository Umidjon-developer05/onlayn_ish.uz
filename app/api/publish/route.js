import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../libs/mongoose";
import { Publish } from "../../../models/Publish";
export async function POST(request) {
  const { Action, id } = await request.json();

  try {
    await mongooseConnect();

    const userfind = await Publish.create({
      Action,
      id,
    });

    return NextResponse.json(
      { message: "userfind created successfully", userfind },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating userfind:", error);
    return NextResponse.error("Failed to create userfind", { status: 500 });
  }
}
export async function GET() {
  await mongooseConnect();
  const userfind = await Publish.find();
  return NextResponse.json(userfind);
}
