"use client";

import React, { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { backendUrl } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from "next/navigation";

const fetchBooks = async () => {
    const res = await axios.get(`${backendUrl}/api/books`);
    return res.data;
};

const fetchBookmarks = async (userId: string) => {
    const res = await axios.get(`${backendUrl}/users/${userId}/bookmark`);
    return res.data;
};

const addOrRemoveBookmark = async ({ userId, bookId, token }: { userId: string, bookId: string, token: string }) => {
    const response = await axios.post(`${backendUrl}/users/${userId}/bookmark/${bookId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
};

const Home = () => {
    const { toast } = useToast();
    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth.authState);
    const token = useSelector((state: RootState) => state.auth.token);
    const id = useSelector((state: RootState) => state.auth.id);
    const [searchTerm, setSearchTerm] = useState('');

    const queryClient = useQueryClient();

    const { data: books = [], isLoading: booksLoading, isError: booksError } = useQuery({
        queryKey: ['books'],
        queryFn: fetchBooks,
        retry: true,
        retryDelay: 1000,
    });

    const { data: bookmarks = [], isLoading: bookmarksLoading, isError: bookmarksError } = useQuery({
        queryKey: ['bookmarks', id],
        queryFn: () => auth && id ? fetchBookmarks(id) : Promise.resolve([]),
        enabled: !!auth && !!id,
        retry: true,
        retryDelay: 1000,
    });

    const { mutate: addBookmark } = useMutation({
        mutationFn: addOrRemoveBookmark,
        onSuccess: () => {
            queryClient.invalidateQueries(['bookmarks', id]);
            toast({
                title: "Bookmark updated",
                description: "The bookmark has been updated successfully.",
            });
        },
        onError: (error: any) => {
            toast({
                title: "An error occurred",
                description: error.message,
                variant: "destructive"
            });
        }
    });

    const handleSearch = (term: string) => setSearchTerm(term);

    const filteredBooks = useMemo(() => {
        return books.filter((book: any) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [books, searchTerm]);

    const onAddFavorite = (bookId: string) => {
        if (!auth) {
            router.push('/login');
            return;
        }
        addBookmark({ userId: id, bookId, token });
    };

    if (booksLoading || bookmarksLoading) return <div>Loading...</div>;
    if (booksError || bookmarksError) return <div>Error loading books or bookmarks</div>;

    const bookmarkedIds = bookmarks.map((bookmark: any) => bookmark._id);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Book Catalog</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book: any) => {
                    const isBookmarked = bookmarkedIds.includes(book._id);
                    return (
                        <BookCard
                            key={book._id}
                            book={book}
                            onAddFavorite={() => onAddFavorite(book._id)}
                            isBookmarked={isBookmarked}
                            isAuth={auth}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
