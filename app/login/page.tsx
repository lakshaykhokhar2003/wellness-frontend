"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {login} from "@/store/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import useAuth from "@/hooks/authHook";
import {backendUrl} from "@/lib/utils";

const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address."}),
    password: z.string(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;


const LoginForm = () => {
    const {loginHandler} = useAuth()
    const router = useRouter()

    const {toast} = useToast()

    const form = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        }
    });


    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await axios.post(`${backendUrl}/login`, data)
            loginHandler(response.data._id,response.data.email, response.data.token)
            form.reset();
            router.push('/')
        } catch (e) {
            toast({
                title: "An error occurred",
                description: e.message,
                variant: "destructive"
            })
        }
    };

    return (
        <div className="flex h-screen">
            <Form {...form}>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-full max-w-md p-8 space-y-6 bg-card shadow-lg rounded-lg">
                        <h2 className="text-3xl font-bold text-center text-primary">Login</h2>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-6">
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
                            <Button type="submit" className="bg-primary text-primary-foreground">
                                Login
                            </Button>
                            <Link href="/register" className="block tracking-tighter text-primary hover:underline">
                                Don&apos;t have an account? Register here.
                            </Link>
                        </form>
                    </div>
                </div>
            </Form>
            <div className="w-1/2 bg-cover bg-center flex items-center ">
                <Image src="/sapiens.png" alt="image" width={1000} height={1000} className="max-w-[800px]"/>
            </div>
        </div>
    )
        ;
};

export default LoginForm;
