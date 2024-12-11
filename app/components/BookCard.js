
import styles from "../page.module.css";

const BookCard = ({ book, onClick }) => {
    // Get the authors of the book, or show "Unknown author" if not available
    const authors = book.volumeInfo.authors?.join(", ") || "Unknown author";

    // Get the year from the published date or show "Unknown year" if missing
    const publishedYear = book.volumeInfo.publishedDate?.split("-")[0] || "Unknown year";
  
    return (
      <div className={styles.bookCard} onClick={() => onClick(book)}>
        {/* Display the book image or use placeholder if no image is available */}
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x200"}
          alt={book.volumeInfo.title}
          className={styles.bookImage}
        />

        {/* Show book title, author(s), and published year */}
        <div className={styles.bookShortDetails}>
            <h3>{book.volumeInfo.title}</h3>
            <h5>{authors}</h5>
            <h6>{publishedYear}</h6> 
        </div>
        </div>
    );
};

export default BookCard;
