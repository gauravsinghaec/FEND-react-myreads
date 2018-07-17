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
    return (
      <div className="app">
        <ListBooks books={this.state.books}/>
      </div>
    )
  }
}

export default BooksApp
