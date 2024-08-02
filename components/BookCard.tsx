'use client'

import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/Card'
import {Button} from '@/components/ui/Button'
import Image from 'next/image'

const BookCard = ({book, onAddFavorite}: { book: Record<string, string>, onAddFavorite: Function }) => {
    return (
        <Card key={book.id}>
            <CardHeader>
                <CardTitle>{book.title}</CardTitle>

                <p className="text-gray-700">{book.author}</p>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Image src={book.image} alt="image" width={300} height={300}
                       className="rounded-lg flex flex-1 min-h-96 max-h-96 object-contain"/>
            </CardContent>
            <CardContent>
                <CardDescription>{book.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button onClick={() => onAddFavorite(book._id)}>Add to Favorites</Button>
            </CardFooter>
        </Card>
    );
};

export default BookCard;
