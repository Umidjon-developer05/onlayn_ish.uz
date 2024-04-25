import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../libs/mongoose";
import { BozorFind } from "../../../models/Bozor";
export async function POST(request) {
  const {
    title,
    desription,
    name,
    email1,
    price,
    email,
    image,
    category,
    text,
    Date,
  } = await request.json();

  try {
    await mongooseConnect();

    const userfind = await BozorFind.create({
      title,
      desription,
      text,
      Date,
      email1,
      price,
      category,
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
  const userfind = await BozorFind.find();
  return NextResponse.json(userfind);
}

export async function PUT(request) {
  try {
    const {
      title,
      desription,
      text,
      Date,
      email1,
      price,
      category,
      name,
      email,
      image,
      _id,
    } = await request.json();

    const categoryDoc = await BozorFind.updateOne(
      { _id },
      {
        title,
        desription,
        text,
        Date,
        email1,
        price,
        category,
        name,
        email,
        image,
      }
    );

    return NextResponse.json({ categoryDoc });
  } catch (error) {
    console.error("Error updating userfind:", error);
    return NextResponse.error("Failed to update userfind", { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await BozorFind.findByIdAndDelete(id);
  return NextResponse.json({ message: "userfind deleted" }, { status: 200 });
}
