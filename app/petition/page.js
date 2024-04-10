"use client";
import React from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Petition = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;
    let telegram_bot_id = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID;

    // Extract properties from data
    const { firstName, phone, url } = data;

    if (!firstName && !phone && !url) {
      toast.success("To'liq to'ldiring iltimos 😊");
    }
    let message = `Ismi : ${firstName};\n Phone: ${phone};\n CV Url: ${url}`;
    if (message && data && firstName && phone && url) {
      let settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      };
      try {
        await fetch(
          `https://api.telegram.org/bot${telegram_bot_id}/sendMessage`,
          settings
        );
        toast.success("Xabar yuborildi ✔️");
        reset();
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }
  };

  return (
    <div>
      <div class="container text-center">
        <h3 class="animate-charcter1 "> Kimlar bizga ishga kirib biladi </h3>
        <div class="row">
          <div class="col-md-12 text-center">
            <h3 class="animate-charcter"> Dasturchilar,</h3>
            <h3 class="animate-charcter"> SMM chilar,</h3>
            <h3 class="animate-charcter"> MObile dasturchilar,</h3>
          </div>
        </div>

        <div className="mt-10 w-full flex flex-col gap-3 items-center ">
          <div>
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Label className="flex justify-start">Ismi</Label>
              <Input
                type="text"
                className=" sm:w-[500px]"
                placeholder="Ismi..."
                {...register("firstName")}
              />
              <Label className="flex justify-start">Telefon raqami</Label>
              <Input
                type="text"
                {...register("phone")}
                className=" sm:w-[500px]"
                placeholder="+998"
              />
              <Label className="flex justify-start">CV url</Label>
              <Input
                type="url"
                className=" sm:w-[500px]"
                {...register("url")}
                placeholder="Cv...."
              />
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                variant="shadow"
                type="submit"
              >
                Jonatish
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petition;
