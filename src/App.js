import React from 'react'
import './App.css'
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <ListBooks />
      </div>
    )
  }
}

export default BooksApp
