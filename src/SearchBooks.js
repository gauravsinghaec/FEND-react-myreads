import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

/**
 * React component for search page
 *
 * @class SearchBooks
 * @constructor
 */
class SearchBooks extends React.Component {
	state = {
		showBooks: [],
		query: ''
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
	updateQuery = (query)=> {
		this.setState({query: query.trim()});
		BooksAPI.search(query)
		.then((books)=> {
			this.setState((state)=>({
				showBooks: books
			}));
		})
		.catch((e)=>{console.log(e)})
	};

	render(){
		const { query } = this.state;
		return(
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/" className="close-search">Close</Link>
				<div className="search-books-input-wrapper">
				{/*
					NOTES: The search from BooksAPI is limited to a particular set of search terms.
					You can find these search terms here:
					https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

					However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
					you don't find a specific author or title. Every search is limited by search terms.
				*/}
				<input type="text" placeholder="Search by title or author"
					value={query}
					onChange={(event)=> this.updateQuery(event.target.value)}
				/>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">
					{this.state.showBooks.map((book)=>(
						<li key={book.id}>
							<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail)?book.imageLinks.thumbnail:''})` }}></div>
										<div className="book-shelf-changer">
											<select defaultValue={'none'} onChange={(event)=>{}}>
												<option value="move" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{book.title}</div>
								<div className="book-authors">{book.authors}</div>
							</div>
						</li>
					))}
				</ol>
			</div>
		</div>
		)
	}
}

export default SearchBooks;
