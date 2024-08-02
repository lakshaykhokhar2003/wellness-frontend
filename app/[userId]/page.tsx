"use client"
import React, {useEffect, useState} from 'react';
import BookCard from "@/components/BookCard";
import axios from "axios";

import {useToast} from "@/components/ui/use-toast";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {backendUrl} from "@/lib/utils";

const Favorites = ({ params }: { params: { userId: string } }) => {
    const {toast} = useToast()
    const { userId } = params;
    const id = useSelector((state: RootState) => state.auth.id);
    const token = useSelector((state: RootState) => state.auth.token);
    const [books, setBooks] = useState([] as Array<Record<string, string>>);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get(`${backendUrl}/users/${userId}/bookmark`);
                setBooks(res.data)
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        };
        fetchBooks();
    }, []);

    const onAddFavorite = async (book:{book:Record<string, string>}) => {
        console.log(book)
        try {
            const response = await axios.post(`${backendUrl}/users/${id}/bookmark/${book}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // eslint-disable-next-line
            if(response.status === 201) setBooks(books=> books.filter(b => b._id === book._id))
        } catch (e) {
            toast(
                {
                    title: "An error occurred",
                    description: e.message,
                    variant: "destructive"
                }
            )
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Favorite Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book: any) => (
                    <BookCard key={book._id} book={book} onAddFavorite={onAddFavorite}/>
                ))}
            </div>
        </div>
    );
}


export default Favorites;
