import React from 'react'
import './App.css'
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  //Fetch the books from the BooksAPI
  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=> {
      this.setState({books});
      console.log(books);
    })
  }

/* Upadte the books shelf in BooksAPI
 * and update the app state to re-render the view
 */
  moveToShelf = (book,shelf)=>{
    BooksAPI.update(book,shelf);
    this.setState((state)=>({
      books: state.books.map((bk)=>{
        if(book.id === bk.id){
          bk.shelf = shelf;
        }
        return bk;
      })
    }));
  }
  render() {
    let readBooks= [],
        readingBooks= [],
        wantToReadBooks = [];
    this.state.books.map((book)=>{
      switch(book.shelf){
        case 'read':
          readBooks.push(book);
          break;
        case 'wantToRead':
          wantToReadBooks.push(book);
          break;
        case 'currentlyReading':
          readingBooks.push(book);
          break;
      }
    });
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <ListBooks shelf={'Currently Reading'} books={readingBooks} onChangeShelf={this.moveToShelf} />
          <ListBooks shelf={'Want to Read'} books={wantToReadBooks} onChangeShelf={this.moveToShelf} />
          <ListBooks shelf={'Read'} books={readBooks} onChangeShelf={this.moveToShelf} />
          <div className="open-search">
            <a href="#">Add a book</a>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
