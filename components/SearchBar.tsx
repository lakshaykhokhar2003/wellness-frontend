"use client"
import React from 'react';
import {Input} from '@/components/ui/input';

const SearchBar = ({onSearch}) => {
    return (
        <Input
            type="text"
            placeholder="Search for books..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full mt-4 mb-4"
        />
    );
};

export default SearchBar;
