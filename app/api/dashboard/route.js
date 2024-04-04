import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../libs/mongoose";
import { Dashboard } from "../../../models/dashboard";
export async function POST(request) {
  const { price, description, name, email, image } = await request.json();

  try {
    await mongooseConnect();

    const userfind = await Dashboard.create({
      price,
      description,
      name,
      email,
      image,
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
  const userfind = await Dashboard.find();
  return NextResponse.json(userfind);
}

export async function PUT(request) {
  try {
    const { price, description, name, email, image, _id } =
      await request.json();

    const categoryDoc = await Dashboard.updateOne(
      { _id },
      { price, description, name, email, image }
    );

    return NextResponse.json({ categoryDoc });
  } catch (error) {
    console.error("Error updating userfind:", error);
    return NextResponse.error("Failed to update userfind", { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await Dashboard.findByIdAndDelete(id);
  return NextResponse.json({ message: " deleted" }, { status: 200 });
}
