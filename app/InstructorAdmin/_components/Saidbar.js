"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function LampDemo() {
  const session = useSession();
  const router = useRouter();
  function SignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    router.push("/");
  }
  return (
    <Card className="sm:w-[1000px]    rounded-md border border-slate-800  px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2  ">
      <CardHeader className="flex gap-3  justify-between ">
        <div className="flex gap-4">
          <div>
            <Image
              alt="nextui logo"
              height={40}
              radius="full"
              src={
                session?.data?.user?.image ? (
                  session?.data?.user?.image
                ) : (
                  <Skeleton className="flex rounded-full w-12 h-12" />
                )
              }
              width={40}
            />
          </div>
          <div className="flex flex-col ">
            <p className="text-md">
              {session?.data?.user?.name ? (
                session?.data?.user?.name
              ) : (
                <Skeleton className="h-3 w-full rounded-lg" />
              )}
            </p>
            <p className="text-small text-default-500">
              {session?.data?.user?.email}
            </p>
          </div>
        </div>
        <div>
          <Button
            onClick={() => SignOut()}
            className="bg-gradient-to-tr p-2 rounded-lg from-pink-500 to-yellow-500 text-white shadow-lg"
          >
            Logout
          </Button>
        </div>
      </CardHeader>

      <Divider />
      <CardBody>
        <p>Xush kelibsiz admin panelga.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          href="/InstructorAdmin/dashboard"
          className="bg-gradient-to-tr p-2 rounded-lg from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          Dashboard
        </Link>
      </CardFooter>
    </Card>
  );
}
