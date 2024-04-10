"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const Work = ({ filteredData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, project) => {
    try {
      const res = await fetch("/api/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: data.phone,
          text: data.text,
          name: project.name,
          email: project.email,
          image: project.image,
        }),
      });

      if (res.ok) {
        toast.success("offer created successfully");
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 flex flex-wrap gap-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {filteredData?.map((project) => (
        <Card className="sm:w-[500px]" key={project?._id}>
          <CardHeader className="flex gap-3">
            <p className="text-xl">{project?.title}</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-3">
            <p className="flex gap-2 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-geo-alt text-green-500"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              <span>{project?.desription}</span>
            </p>
            <p className="flex gap-2 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-wallet text-green-500"
                viewBox="0 0 16 16"
              >
                <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1" />
              </svg>
              <span>{project?.price}</span>
            </p>
            <p className="flex gap-2 items-center  justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-card-text text-green-500 "
                viewBox="0 0 16 16"
              >
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
              </svg>
              <span className="text-sm ">{project?.text}</span>
            </p>
            <p className="flex gap-2 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-calendar-date text-green-500"
                viewBox="0 0 16 16"
              >
                <path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
              </svg>
              <span>{project?.Date}</span>
            </p>
          </CardBody>
          <Divider />
          <CardFooter className="flex w-full  flex-wrap gap-5 justify-between items-center">
            <div className="flex gap-2">
              <Image
                alt="nextui logo"
                height={40}
                radius="full"
                src={project?.image}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{project?.name}</p>
                <p className="text-sm text-default-500">{project?.email}</p>
              </div>
            </div>
            <div className=" flex justify-end ">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Taklif Yuborish</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <form
                    onSubmit={handleSubmit((data) => onSubmit(data, project))}
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {project?.name}
                        <p className="text-red-500 text-sm font-medium">
                          {" "}
                          Iltimos taklif yuborsangiz telefon raqamingizni
                          togri yuboring siz bilan boglanishadi
                        </p>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="terms">Telefon</Label>
                          <Input
                            type="text"
                            placeholder="+998"
                            {...register("phone")}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="terms">
                            Qoshimcha matn (shart emas)
                          </Label>
                          <Textarea
                            placeholder="Qoshimcha matn..."
                            {...register("text")}
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className={"mt-3"}>
                      <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                      <Button>Yuborish</Button>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Work;
