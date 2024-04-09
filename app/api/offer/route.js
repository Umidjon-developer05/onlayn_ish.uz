import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../libs/mongoose";
import { Offer } from "../../../models/Offer";
export async function POST(request) {
  const { phone, text, name, email, image } = await request.json();

  try {
    await mongooseConnect();

    const userfind = await Offer.create({
      phone,
      text,
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
  const userfind = await Offer.find();
  return NextResponse.json(userfind);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await Offer.findByIdAndDelete(id);
  return NextResponse.json({ message: " deleted" }, { status: 200 });
}
