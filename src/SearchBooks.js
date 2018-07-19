import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

/**
 * React component for search page
 *
 * @class SearchBooks
 * @constructor
 */
class SearchBooks extends React.Component {
// Add state as class property outside contructor
  state = {
    showBooks: [],
    query: '',
  };

  /**
   * This method updates the query property of the component's state
   * and it also makes an API request to get the searched
   * books data and update the showBooks property of the state
   *
   * @method updateQuery
   * @param {string} query- search query string
   * @return : none
   */
  updateQuery = (query) => {
    // get the book lists from main page
    const mainPageBooks = this.props.books;

    // Update the query state
    this.setState({ query: query.trim() });

    /**
     * this checks if we pass empty qurey string, if so
     * it reset the search book state
     */
    if (query.trim()) {
      BooksAPI.search(query)
        .then((searchedBooks) => {
          // reset the search book state is we didn't get any data from the API
          if (!searchedBooks || !searchedBooks.length) searchedBooks = [];

          /**
           * loop through searched results and override the book which are
           * allredy present in main page state before updating the book state
           * of search page
           */
          searchedBooks = searchedBooks.map((book) => {
            for (const mainPageBook of mainPageBooks) {
              if (mainPageBook.id === book.id) {
                book = mainPageBook;
              }
            }
            return book;
          });

          // Update the state in real time on searh page
          this.setState((state) => ({
            showBooks: searchedBooks
          }));
        })
        .catch((e) => { console.log(e); });
    } else {
      this.setState({ showBooks: [] });
    }
  };

  /* The render method will be called each time an update happens.
   * This is a lifecycle hook which runs after a component is added
   * or re-rendered to the DOM.
   */
  render() {
    const { query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author.
              So, don't worry if you don't find a specific author or title.
              Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.showBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : ''})` }}>
                    </div>
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(event) => this.props.onChangeShelf(book, event.target.value)}>
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
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
