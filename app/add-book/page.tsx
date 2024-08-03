"use client"
import React from 'react';
import BookForm from "@/components/BookForm";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useRouter} from "next/navigation";

const AddBook = () => {
    const auth = useSelector((state: RootState) => state.auth.authState);
    const router = useRouter()

    if(!auth) router.push('/login')
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Add a New Book</h1>
            <BookForm />
        </div>
    );
};

export default AddBook;
