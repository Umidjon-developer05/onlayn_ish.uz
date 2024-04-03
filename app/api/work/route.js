import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../libs/mongoose";
import { WorkFind } from "../../../models/Work";
export async function POST(request) {
  const { title, desription, text, Date } = await request.json();

  try {
    await mongooseConnect();

    const userfind = await WorkFind.create({
      title,
      desription,
      text,
      Date,
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
  const userfind = await WorkFind.find();
  return NextResponse.json(userfind);
}

export async function PUT(request) {
  try {
    const { title, desription, text, Date, _id } = await request.json();

    const categoryDoc = await WorkFind.updateOne(
      { _id },
      { title, desription, text, Date }
    );

    return NextResponse.json({ categoryDoc });
  } catch (error) {
    console.error("Error updating userfind:", error);
    return NextResponse.error("Failed to update userfind", { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await WorkFind.findByIdAndDelete(id);
  return NextResponse.json({ message: "userfind deleted" }, { status: 200 });
}
