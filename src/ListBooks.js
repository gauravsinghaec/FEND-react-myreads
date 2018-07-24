import React from 'react';
import PropTypes from 'prop-types';

const ListBooks = ({
  shelf, books, title, onChangeShelf,
}) => (
  <div className="list-books-content">
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {title}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              book.shelf === shelf && (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : ''})` }} />
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(event) => { onChangeShelf(book, event.target.value); }}>
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">
                          Want to Read
                        </option>
                        <option value="read">
                          Read
                        </option>
                        <option value="none">
                          None
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">
                    { book.title }
                  </div>
                  <div className="book-authors">
                    { book.authors }
                  </div>
                </div>
              </li>
              )))}
          </ol>
        </div>
      </div>
    </div>
  </div>
);

// Add PropTypes validation
ListBooks.propTypes = {
  shelf: PropTypes.string.isRequired,
  books: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default ListBooks;
