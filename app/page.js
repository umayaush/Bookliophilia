"use client";

import { useState } from "react";
import BookCard from "./components/BookCard";
import styles from "./page.module.css";

export default function Page() {
  // State to keep track of the search query entered by the user
  const [searchQuery, setSearchQuery] = useState("");

  // State to store the list of books fetched from the API
  const [books, setBooks] = useState([]);

   // State to manage loading indicator during the API call
  const [loading, setLoading] = useState(false);

  // State to handle the currently selected book for detailed view
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch books from the Google Books API
  const fetchBooks = async () => {
    if (!searchQuery) return;
    setLoading(true);

    // Store fetched books or an empty array
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );
      const data = await response.json();
      setBooks(data.items || []);

      // Log error to console
    } catch (error) {
      console.error("Error fetching books:", error);

    } finally {
      setLoading(false);
    }
  };

  // Update search query state whenever input value changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submission and trigger the book fetch
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchBooks();
  };

  // Set the selected book when a card is clicked
  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className={styles.page}>
      {/* Header Div */}
      <div className={styles.headerDiv}>
        <h1>Bookliophilia</h1>
        <h2>Your on the go library...</h2>
      </div>

      {/* Search Bar */}
      <form className={styles.searchDiv} onSubmit={handleSubmit}>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for books..."
          />
          <button type="submit" disabled={loading}>
            Search
          </button>
        </div>
      </form>

      {/* Loading Message */}
      {loading && <p>Loading...</p>}

      {/* Book Cards */}
      <div className={styles.booksGrid}>
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} onClick={handleCardClick} />
          ))
        ) : (
          <p>No books found :(</p>
        )}
      </div>

      {/* Open Card Book Details*/}
      {selectedBook && (
        <div className={styles.bookDetails}>
          <div className={styles.openCard}>

            {/* Close open card Button */}
            <button
              className={styles.closeButton}
              onClick={() => setSelectedBook(null)}
            >
              Close
            </button>

            {/* Display selected book title and cover */}
            <h2>{selectedBook.volumeInfo.title}</h2>
            <img
              src={
                selectedBook.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/128x200"
              }
              alt={selectedBook.volumeInfo.title}
              className={styles.bookImageLarge}
            />

            {/* Show book details like summary, authors, year, and rating */}
            <p className={styles.summary}><strong>Summary:</strong> {selectedBook.volumeInfo.description}</p>
            <p><strong>Author(s):</strong> {selectedBook.volumeInfo.authors?.join(", ")}</p>
            <p><strong>Published Year:</strong> {selectedBook.volumeInfo.publishedDate?.split("-")[0]}</p>
            <p><strong>Star Rating:</strong> {selectedBook.volumeInfo.averageRating || "N/A"}</p>
            <button className={styles.readMoreBtn} onClick={() => window.open(selectedBook.volumeInfo.infoLink, "_blank", "noopener noreferrer")}>
                Read more
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
