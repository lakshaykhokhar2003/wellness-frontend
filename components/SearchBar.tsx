"use client"
import React from 'react';
import {Input} from '@/components/ui/Input';

const SearchBar = ({onSearch}) => {
    return (
        <Input
            type="text"
            placeholder="Search for books..."
            onChange={(e) => onSearch(e.target.value)}
        />
    );
};

export default SearchBar;
