import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
// Add state as class property outside contructor
  state = {
    books: [],
  }

  /**
   * This is a lifecycle hook which runs immediate after the component
   * output has been rendered to the DOM.
   */
  componentDidMount() {
    // Fetch the books from the BooksAPI
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books });
      });
  }

  /**
   * This method upadtes the books shelf in BooksAPI
   * and it also update the app state to re-render the view
   *
   * @method moveToShelf
   * @param {Object} book- search query string
   * @param {String} shelf- bookshelf(category) to be updated
   * @return : none
   */
  moveToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    const updatedBook = book;
    const { books } = this.state;
    let isNewBookAdded = true;
    let updatedBooks = [];

    // Update the bookshelf and return the new book array
    updatedBooks = books.map((bk) => {
      const shelfBook = bk;
      if (updatedBook.id === bk.id) {
        shelfBook.shelf = shelf;

        /**
         * This flag denotes if the book is added from searh page or not
         * if the book is allredy present in main page state then set the
         * flag to false so that it won't be added to this state again
         */
        isNewBookAdded = false;
      }
      return shelfBook;
    });

    updatedBook.shelf = shelf;

    this.setState(state => (
      // Check the flag and concate to or update the existing book state of main page acordingly
      isNewBookAdded ? { books: state.books.concat([book]) } : { books: updatedBooks }
    ));
  }

  /**
   * The render method will be called each time an update happens.
   * This is a lifecycle hook which runs after a component is added
   * or re-rendered to the DOM.
   */
  render() {
    const readBooks = [];
    const readingBooks = [];
    const wantToReadBooks = [];
    const { books } = this.state;
    /**
     * loop through all the books and put it in 3 different array
     * based on the bookshelf they belogs to. Later these arrays
     * are passed to to ListBooks component as props which
     * are used to render books in different section as per shelf
     */
    books.forEach((book) => {
      switch (book.shelf) {
        case 'read':
          readBooks.push(book);
          break;
        case 'wantToRead':
          wantToReadBooks.push(book);
          break;
        case 'currentlyReading':
          readingBooks.push(book);
          break;
        default:
          break;
      }
    });
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>
                  MyReads
                </h1>
              </div>
              <ListBooks shelf="Currently Reading" books={readingBooks} onChangeShelf={this.moveToShelf} />
              <ListBooks shelf="Want to Read" books={wantToReadBooks} onChangeShelf={this.moveToShelf} />
              <ListBooks shelf="Read" books={readBooks} onChangeShelf={this.moveToShelf} />
              <div className="open-search">
                <Link to="/search" className="search-books">
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooks mainPageBooks={books} onChangeShelf={this.moveToShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
