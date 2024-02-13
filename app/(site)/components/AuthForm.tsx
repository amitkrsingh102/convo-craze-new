"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type VariantType = "LOGIN" | "REGISTER";

const AuthForm = () => {
	const session = useSession();
	const router = useRouter();

	const [variant, variantSet] = useState<VariantType>("LOGIN");
	const [isLoading, isLoadingSet] = useState(false);

	useEffect(() => {
		if (session.status === "authenticated") {
			router.push("/users");
		}
	}, [session.status, router]);

	const toggleVariant = useCallback(() => {
		variant === "LOGIN" ? variantSet("REGISTER") : variantSet("LOGIN");
	}, [variant]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		isLoadingSet(true);
		if (variant === "REGISTER") {
			axios
				.post("/api/register", data)
				.then(() => signIn("credentials", data))
				.catch(() => toast.error("Something went wrong!"))
				.finally(() => isLoadingSet(false));
		}
		if (variant === "LOGIN") {
			signIn("credentials", {
				...data,
				redirect: false,
			})
				.then((callback) => {
					if (callback?.error) {
						toast.error("Invalid credentials!");
					}

					if (callback?.ok && !callback.error) {
						toast.success("Logged in !");
						router.push("/users");
					}
				})
				.finally(() => isLoadingSet(false));
		}
	};

	const socialAction = (action: string) => {
		isLoadingSet(true);
		signIn(action, { redirect: false })
			.then((callback) => {
				if (callback?.error) {
					toast.error("Invalid credentials!");
				}

				if (callback?.ok && !callback.error) {
					toast.success("Logged in !");
					router.push("/users");
				}
			})
			.finally(() => isLoadingSet(false));
	};

	return (
		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{variant === "REGISTER" && (
						<Input
							label="Name"
							register={register}
							id="name"
							errors={errors}
						/>
					)}
					<Input
						label="Email"
						register={register}
						id="email"
						type="email"
						errors={errors}
						disabled={isLoading}
					/>
					<Input
						label="Password"
						register={register}
						id="password"
						type="password"
						errors={errors}
						disabled={isLoading}
					/>
					<div>
						<Button disabled={isLoading} fullWidth type="submit">
							{variant === "LOGIN" ? "Sign In" : "Register"}
						</Button>
					</div>
				</form>
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								or continue with
							</span>
						</div>
					</div>
					<div className="mt-6 flex gap-2">
						<AuthSocialButton
							icon={BsGithub}
							onClick={() => socialAction("github")}
						/>
						<AuthSocialButton
							icon={BsGoogle}
							onClick={() => socialAction("google")}
						/>
					</div>
				</div>
				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
					<div>
						{variant === "LOGIN"
							? "New to ConvoCraze?"
							: "Already have an account?"}
					</div>
					<div
						onClick={toggleVariant}
						className="underline cursor-pointer "
					>
						{variant === "LOGIN" ? "Create an account" : "Login"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
