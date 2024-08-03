'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const BookCard = ({ book, onAddFavorite, isBookmarked, isAuth }: { book: Record<string, string>, onAddFavorite: () => void, isBookmarked: boolean, isAuth: boolean }) => {
    const router = useRouter();

    return (
        <Card key={book.id}>
            <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <p className="text-gray-700">{book.author}</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Image src={book.image} alt="image" width={300} height={300}
                       className="rounded-lg flex flex-1 min-h-96 max-h-96 object-contain" />
            </CardContent>
            <CardContent>
                <CardDescription>{book.description}</CardDescription>
            </CardContent>
            <CardFooter>
                {isBookmarked ? (
                    <Button onClick={() => onAddFavorite()}>
                        <Check className="mr-1 h-5 w-5" aria-hidden="true" />Bookmarked
                    </Button>
                ) : (
                    <Button onClick={() => isAuth ? onAddFavorite() : router.push('/login')}>
                        {isAuth ? 'Add to Favorites' : 'Login to Add to Favorites'}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default BookCard;
