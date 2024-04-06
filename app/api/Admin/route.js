import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import AdminCreate from "../../../models/AdminCreate";

export async function POST(request) {
  const saltRounds = 10;
  const { email, password } = await request.json();

  // Hash the password
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    await connectMongoDB();

    // Create the admin with hashed password
    const admin = await AdminCreate.create({
      email,
      password: hashPassword,
    });

    return NextResponse.json(
      { message: "Admin created successfully", admin },
      { status: 201 }
    );
  } catch (error) {
    // Handle any errors
    console.error("Error creating admin:", error);
    return NextResponse.error("Failed to create admin", { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const admin = await AdminCreate.find();
  return NextResponse.json(admin);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await AdminCreate.findByIdAndDelete(id);
  return NextResponse.json({ message: "admin deleted" }, { status: 200 });
}
