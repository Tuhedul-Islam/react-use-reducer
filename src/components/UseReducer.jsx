import React, {useState, useReducer} from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

const UseReducer = () => {

    const [newBook, setNewBook] = useState('');

    const bookArr = [
        { id: 1, name: "book 1" },
        { id: 2, name: "book 2" },
        { id: 3, name: "book 3" },
        { id: 4, name: "book 4" },
    ];

    const initialState = {
        books: bookArr,
        isModalOpen: false,
        isModaColor: false,
        modalText: "",
    };


    const reducer = (state, action) => {
        switch(action.type){
            case "Add":
                return {...state, books: [...state.books, action.payload], isModalOpen: true, isModaColor: false, modalText: "Book added successfully"}
            case "Delete":
                return {...state, books: state.books.filter((book) => book.id !== action.payload), isModalOpen: true, isModaColor: true, modalText: "Book deleted successfully"}
            case "Modal":
                return {...state, isModalOpen: action.payload, modalText: ""}
            default:
                return state
        }
    }

    const [bookState, dispatch] = useReducer(reducer, initialState);


    const handleSubmit = (e) => {
        e.preventDefault();
        const book = {
            id: Date.now(),
            name: newBook,
        }
        dispatch({type: "Add", payload: book})
        setNewBook('')
    }

    //Dismiss The Modal
    setTimeout(()=>{
        dispatch({type: "Modal", payload: false})
    },10000);


    return (
        <div>
            <Form onSubmit={handleSubmit} className='mb-3'>
                <Form.Control
                    type="text" 
                    value={newBook} 
                    name='new_book' 
                    required 
                    onChange={(e) => setNewBook(e.target.value)} 
                 />
                <Button variant="primary" type='submit' className='my-2'>Add</Button>
            </Form>

            {
                bookState.isModalOpen &&
                <div className={`alert ${bookState.isModaColor ? 'alert-danger' : 'alert-info'}`}>
                    {bookState.modalText}
                </div>
            }
            
            {
                Array.isArray(bookState.books) &&
                bookState.books.map((book) => (
                    <div key={book.id} >
                        <p 
                            style={{}}
                            className='border p-2 m-2'
                         >
                            <span className='me-2'>
                                {book.name}
                            </span>
                            <Button 
                                variant='danger'
                                onClick={() => dispatch({type: "Delete", payload: book.id})}
                            >
                                Delete
                            </Button>
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default UseReducer