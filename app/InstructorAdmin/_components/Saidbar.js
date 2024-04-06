"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../../components/ui/lamp";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
export default function LampDemo() {
  const session = useSession();
  return (
    <LampContainer className={"-mt-20"}>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <Card className="sm:w-[1000px]   animate-shimmer  items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none  ">
          <CardHeader className="flex gap-3 ">
            <Image
              alt="nextui logo"
              height={40}
              radius="full"
              src={session?.data?.user?.image}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{session?.data?.user?.name}</p>
              <p className="text-small text-default-500">
                {session?.data?.user?.email}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Xush kelibsiz admin panelga.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link href="/InstructorAdmin/dashboard" >
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              >
                Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.h1>
    </LampContainer>
  );
}
