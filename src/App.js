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
      this.setState({books})
    })
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
          <ListBooks shelf={'Currently Reading'} books={readingBooks}/>
          <ListBooks shelf={'Want to Read'} books={wantToReadBooks}/>
          <ListBooks shelf={'Read'} books={readBooks}/>
          <div className="open-search">
            <a href="#">Add a book</a>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
