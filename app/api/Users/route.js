import connectMongoDB from "../../../libs/mongodb";
import Users from "../../../models/Users";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, image, email, role } = await request.json();
  await connectMongoDB();
  await Users.create({ name, image, email, role });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}
export async function GET() {
  await connectMongoDB();
  const users = await Users.find();
  return NextResponse.json(users);
}
