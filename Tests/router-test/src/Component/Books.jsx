import React from 'react';
import Book from './Book';
import Storage from './localStorage';
import { useEffect, useState } from 'react';

const bookStorage = new Storage("Books");
const Books = () => {

    const [books, setBooks] = useState([]);


    useEffect(() => {
        const data = bookStorage.getItem()
        setBooks(data);
        console.log(data);
    }, [])


    return (
        <div className="d-flex flex-wrap gap-3">
            {books && books.map((book, index) => (
                <Book
                    key={index}
                    title={book.title}
                    author={book.author}
                    subject={book.subject}
                    pages={book.pages}
                    price={book.price}
                    publisher={book.publisher}
                />
            ))}
        </div>
    );
};

export default Books;
