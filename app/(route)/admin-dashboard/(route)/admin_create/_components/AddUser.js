import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
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
} from "../../../../../components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
function InnerButton() {
  return <Button>Add User</Button>;
}
const AddUser = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await fetch("/api/Admin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success(" Admin successfully add!!");
            reset();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-24 mx-20">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full ">
            Add Admin
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div className="mb-2 space-y-2">
                  <Label htmlFor="terms">Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mb-2 space-y-2">
                  <Label htmlFor="terms">Password</Label>
                  <Input
                    type="password"
                    placeholder="password"
                    {...register("password", { required: true })}
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <InnerButton />
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddUser;
