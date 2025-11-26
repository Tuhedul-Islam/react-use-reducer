# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Learning
```jsx
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


    //Use Dispatch
    setTimeout(()=>{
        dispatch({type: "Modal", payload: false})
    },10000);

```
