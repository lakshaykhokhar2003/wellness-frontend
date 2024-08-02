"use client"
import React from 'react';
import BookForm from "@/components/BookForm";

const AddBook = () => {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Add a New Book</h1>
            <BookForm />
        </div>
    );
};

export default AddBook;
