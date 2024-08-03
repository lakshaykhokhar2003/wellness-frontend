"use client";

import React from 'react';
import BookCard from "@/components/BookCard";
import axios from "axios";
import {useToast} from "@/components/ui/use-toast";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {backendUrl} from "@/lib/utils";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Loader} from "@/components/Loader";

const fetchBooks = async (userId: string) => {
    const res = await axios.get(`${backendUrl}/users/${userId}/bookmark`);
    return res.data;
};

const addOrRemoveBookmark = async ({userId, bookId, token}: { userId: string, bookId: string, token: string }) => {
    const response = await axios.post(`${backendUrl}/users/${userId}/bookmark/${bookId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
};

const Favorites = ({params}: { params: { userId: string } }) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {toast} = useToast();
    const {userId} = params;
    const token = useSelector((state: RootState) => state.auth.token);
    const auth = useSelector((state: RootState) => state.auth.authState);


    const {data: books = [], isError, isLoading} = useQuery({
        queryKey: ['books', userId],
        queryFn: () => auth ? fetchBooks(userId) : Promise.resolve([]),
        enabled: !!auth,
        retry: true,
        retryDelay: 1000,
    });

    const {mutate: addBookmark} = useMutation({
        mutationFn: addOrRemoveBookmark,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['books', userId]);
            if (response.status === 200) {
                return toast({
                    title: "Bookmark added",
                    description: "The book has been added to your favorites",
                });
            }
            return toast({
                title: "Bookmark removed",
                description: "The book has been removed from your favorites",
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
    if (!auth) return router.push('/')

    const onAddFavorite = (bookId: string) => {
        if (!auth) {
            router.push('/login');
            return;
        }
        addBookmark({userId, bookId, token});
    };

    if (isLoading) return <Loader/>;
    if (isError) return <div>Error loading books</div>;

    const bookIds = books.map((book: any) => book._id);

    const content = books.length === 0 ? (
        <div className="col-span-1 flex flex-col items-center justify-center text-center">
            <Image src="/noimages.png" alt="No favorite books" width={1000} height={1000} className="max-w-[800px]"/>
            <h1 className="text-2xl font-bold mt-4">No favorite books</h1>
        </div>
    ) : (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Favorite Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book: any) => {
                    const isBookmarked = bookIds.includes(book._id);
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

    return (<>
            {content}
        </>
    );
};

export default Favorites;
