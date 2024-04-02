import connectMongoDB from "@/libs/mongodb";
import Users from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const users = await Users.find();
  return NextResponse.json(users);
}
