"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const avatars = ["/avatars/male-avatar.png", "/avatars/female-avatar.png"];

const page = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignup = async (signUpData: FormData) => {
    const username = signUpData.get("username");
    const email = signUpData.get("email");
    const password = signUpData.get("password");
    const confirmPassword = signUpData.get("confirm-password");
    const avatar = signUpData.get("avatar") as File;
    try {
      if (
        username === "" ||
        email === "" ||
        password === "" ||
        avatar === null
      ) {
        toast.error("Enter the data first");
        return;
      }
      if (password !== confirmPassword) {
        setError("Confirm password did not match!");
        toast.error(error);
        return;
      }
      setLoading(true);

      const avatarUrl = await axios
        .post("/api/uploadImage", avatar)
        .then((res) => res.data.imageUrl);

      await axios.post("/api/auth/signup", {
        username,
        email,
        password,
        avatarUrl,
      });
      toast.success("Account created successfully");
      // setTimeout(() => router.push("/login"), 1000);
    } catch (signupError: any) {
      setError(signupError.response.data.error);
      toast.error(signupError.response.data.error);
      console.error("Error on signup ", signupError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loading) return;
            onSignup(new FormData(e.currentTarget));
          }}
          className="flex flex-col mt-4 space-y-2"
        >
          {/* <div className="flex items-center gap-4">
            {avatar ? (
              <img
                src={avatar}
                alt="Selected avatar"
                className="h-16 w-16 rounded-full border"
              />
            ) : (
              <div className="h-16 w-16 rounded-full border flex items-center justify-center text-xs text-muted-foreground">
                Avatar
              </div>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  Choose avatar
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Select your avatar
                  </DialogTitle>
                </DialogHeader>

                <div className="flex gap-4 justify-center!">
                  {avatars.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => {
                        setAvatar(img);
                        setOpen(false);
                      }}
                      className={cn(
                        "relative rounded-full p-1 transition hover:scale-105",
                        avatar === img
                          ? "ring-2 ring-primary"
                          : "ring-2 ring-transparent",
                      )}
                    >
                      <img
                        src={img}
                        alt="Avatar option"
                        className="h-32 w-32 rounded-full"
                      />
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div> */}
          <Field>
            <FieldLabel htmlFor="picture">Picture</FieldLabel>
            <Input id="picture" type="file" name="avatar" />
            <FieldDescription>Upload a profile picture.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-username">
              Username <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="input-field-username"
              name="username"
              type="text"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-email">
              Email <span className="text-destructive">*</span>
            </FieldLabel>
            <Input id="input-field-email" name="email" type="email" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-password">
              Password <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="input-field-password"
              name="password"
              type="password"
              minLength={6}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-confirm-password">
              Confirm-password <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="input-field-confirm-password"
              name="confirm-password"
              type="password"
              minLength={6}
              required
            />
          </Field>

          <Button type="submit" disabled={loading} className="mt-4">
            {loading ? "loading" : "Sign Up"}
          </Button>
        </form>
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default page;
