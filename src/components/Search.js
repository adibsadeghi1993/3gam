import React, { useState, useEffect, useRef } from "react";
import "./search.css";
import axios from "axios";
import Item from "./Item";

const Search = () => {
  const [input, setInput] = useState("");
  const [firstLetterInput,setFirstLetterInput]=useState("")
  const [books, setBooks] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    

    

  }, [input])





  const handleChange = (e) => {
    setInput(e.target.value);
    // const convertFirstCharacterToUppercase = (stringToConvert) => {
    //   var firstCharacter = stringToConvert.substring(0, 1);
    //   var restString = stringToConvert.substring(1);
    
    //   return firstCharacter.toUpperCase() + restString;
    // }
    // const letter=convertFirstCharacterToUppercase(e.target.value)
    // setInput(letter)
    console.log(input)
  };

  const filterHandler = (items) => {
    const filteredData = items.filter((item) => {
      return item.volumeInfo.title.toLowerCase().includes(input.toLowerCase())
    });
    setFilteredBooks(filteredData);
  };

  console.log(filteredBooks);

  useEffect(() => {
    setTimeout(() => {
      if (input === inputRef.current.value && input.length >= 3) {
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?country
            =US&projection=lite&printType=books&key=AIzaSyD6SlU9JUr7Z
            -3SOOy0TfZTJtqv_EEqfZY&q=intitle:${input}&startIndex=0&maxResults=5`
          )
          .then((res) => {
            console.log(res.data.items);
            setBooks(res.data.items);
            // filterHandler(books)
          });
      }
    }, 400);
  }, [input, inputRef]);

  useEffect(() => {
    if (books) {
      filterHandler(books);
    }
  }, [books]);

  return (
    <div className="search">
      <input
        value={input}
        onChange={handleChange}
        className="input"
        ref={inputRef}
      />

      <h1>{input}</h1>
      <div className="books">
        {filteredBooks.length !== 0
          ? filteredBooks.map((book) => {
              return (
                <div key={book.id} className="book">
                  <Item book={book} input={input} />
                </div>
              );
            })
          : "please search your book to get data "}
      </div>
    </div>
  );
};

export default Search;
