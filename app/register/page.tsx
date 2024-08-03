"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import useAuth from "@/hooks/authHook";
import {backendUrl} from "@/lib/utils";

// Define the register form schema using zod
const registerSchema = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters."}),
    email: z.string().email({message: "Invalid email address."}),
    password: z.string().min(6, {message: "Password must be at least 6 characters long."}),
    confirmPassword: z.string().min(6, {message: "Password must be at least 6 characters long."}),
}).superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const {loginHandler} = useAuth()
    const router = useRouter()

    const {toast} = useToast()

    const form = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            const response = await axios.post(`${backendUrl}/register`, {
                ...data,
                username:data.name
            })
            loginHandler(response.data.id,response.data.email, response.data.token)
            form.reset();
            toast({
                title: "Login successful",
                description: "You have been successfully logged in.",
            })
            router.push('/')
        } catch (e) {
            toast({
                title: "An error occurred",
                description: e.message,
                variant: "destructive"
            })
        }
    }

    return (
        <div className="flex h-screen">
            <Form {...form}>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-full max-w-md p-8 space-y-6 bg-card shadow-lg rounded-lg">
                        <h2 className="text-3xl font-bold text-center text-primary">Register</h2>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full Name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email Address" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm Password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-primary text-primary-foreground">
                                Register
                            </Button>
                            <Link href="/login" className="block tracking-tighter text-primary hover:underline">
                                Already have an account? Login here.
                            </Link>
                        </form>
                    </div>
                </div>
            </Form>
            <div className="w-1/2 bg-cover bg-center flex items-center ">
                <Image src="/sapiens.png" alt="image" width={1000} height={1000} className="max-w-[800px]"/>
            </div>
        </div>
    );
};

export default RegisterForm;
