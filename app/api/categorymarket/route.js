import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../libs/mongoose";
import { Categorymarket } from "../../../models/Categorymarket";
export async function POST(request) {
  const { name, parent } = await request.json();

  try {
    await mongooseConnect();

    const category = await Categorymarket.create({ name, parent });

    return NextResponse.json(
      { message: "category created successfully", category },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.error("Failed to create category", { status: 500 });
  }
}

export async function GET() {
  await mongooseConnect();
  const category = await Categorymarket.find();
  return NextResponse.json(category);
}
export async function PUT(request) {
  try {
    const { name, parentCategory, _id } = await request.json();
    await mongooseConnect();

    const categoryDoc = await Categorymarket.updateOne(
      { _id },
      { name, parent: parentCategory || undefined }
    );

    return NextResponse.json({ categoryDoc });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.error("Failed to update category", { status: 500 });
  }
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await Categorymarket.findByIdAndDelete(id);
  return NextResponse.json({ message: "category deleted" }, { status: 200 });
}
