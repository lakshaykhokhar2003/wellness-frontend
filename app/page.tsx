"use client"

import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import {useToast} from "@/components/ui/use-toast";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import axios from "axios";

import {backendUrl} from "@/lib/utils";
const Home = () => {
    const {toast} = useToast()
    const token = useSelector((state: RootState) => state.auth.token);
    const id = useSelector((state: RootState) => state.auth.id);
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`${backendUrl}/api/books`)
            .then((response) => response.json())
            .then((data) => setBooks(data));
    }, []);

    const handleSearch = (term) => setSearchTerm(term);

    const onAddFavorite = async (book:{book:Record<string, string>}) => {
        try {
            await axios.post(`${backendUrl}/users/${id}/bookmark/${book}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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

        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Book Catalog</h1>
            <SearchBar onSearch={handleSearch}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {books
                    .filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((book) => (
                        <BookCard key={book._id} book={book} onAddFavorite={onAddFavorite}/>
                    ))}
            </div>
        </div>

    );
};

export default Home;


