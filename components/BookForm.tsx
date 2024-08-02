"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import React from "react";
import axios, {AxiosResponse} from "axios";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {backendUrl} from "@/lib/utils";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    author: z.string().min(2, {
        message: "Author must be at least 2 characters.",
    }),
    genre: z.string().min(2, {
        message: "Genre must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    price: z.number().positive({
        message: "Price must be a positive number.",
    }),

    image: z.string().url({
        message: "Image must be a valid URL.",
    }),
});

type BookFormInputs = z.infer<typeof formSchema>;


const BookForm = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const form = useForm<BookFormInputs>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            author: "",
            genre: "",
            description: "",
            price: 0,
            image: "",
        }

    });

    const onSubmit = async (values: BookFormInputs) => {
        try {
            const response: AxiosResponse = await axios.post(`${backendUrl}/api/books`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            form.reset()
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 bg-card text-card-foreground p-4 shadow rounded-lg">
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Book Title" {...field} />
                            </FormControl>
                            <FormDescription>
                                The title of the book.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <Input placeholder="Author Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                The author of the book.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="genre"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <FormControl>
                                <Input placeholder="Genre" {...field} />
                            </FormControl>
                            <FormDescription>
                                The genre of the book.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                A brief description of the book.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Price"  {...field} onChange={(e) => {
                                    field.onChange(parseInt(e.target.value, 10))
                                }}/>
                            </FormControl>
                            <FormDescription>
                                The price of the book.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Image URL" {...field} />
                            </FormControl>
                            <FormDescription>
                                The URL of the book&aspos;s cover image.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary text-primary-foreground">
                    Add Book
                </Button>
            </form>
        </Form>
    );
};

export default BookForm;
