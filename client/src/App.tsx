import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css"; 
import { deleteDeck } from "./api/deleteDeck";
import { TDeck, getDecks } from "./api/getDecks";
import { createDeck } from "./api/createDeck";
import { Header } from "./Header";

// TypeScript
// type TDeck = {
//     title: string, 
//     _id: string, 
// }

function App() {
    // useState
    const [title, setTitle] = useState(""); 
    const [decks, setDecks] = useState<TDeck[]>([]); 

    // handleCreateDeck
    const handleCreateDeck = async (e: React.FormEvent) => {
        // prevent default form submit behavior
        e.preventDefault(); 
        // fetch API (URL, { options }) 
        // returns a promise, so we'll make it an async/await function 
        // request header -> content type should be JSON (not text/plain) 
        // const response = await fetch("http://localhost:4000/decks", {
        //     method: "POST", 
        //     // stringified body
        //     body: JSON.stringify({
        //         title, 
        //     }),
        //     headers: {
        //         "Content-Type": "application/json", 
        //     },
        // });
        // const deck = await response.json(); 

        const deck = await createDeck(title); 
        // spread old decks and append newly created deck 
        setDecks([...decks, deck]); 
        // clear out input since async function
        setTitle(""); 
    };

    // handleDeleteDeck 
    const handleDeleteDeck = async (deckId: string) => {
        // await fetch(`http://localhost:4000/decks/${deckId}`, {
        //     method: "DELETE", 
        // });
        // setDecks(decks.filter((deck) => deck._id !== deckId)); 

        // api deleteDeck(id) 
        await deleteDeck(deckId); 
        setDecks(decks.filter((deck) => deck._id !== deckId)); 
    };

    // useEffect
    useEffect(() => {
        const fetchDecks = async () => {
            // // fetch returns an object that has a .json method
            // const response = await fetch("http://localhost:4000/decks"); 
            // // call response.json() 
            // const newDecks = await response.json(); 
            // // console.log(newDecks); // [...]
            // setDecks(newDecks); 
            const newDecks = await getDecks(); 
            setDecks(newDecks); 
        };
        fetchDecks(); 
    }, [])

    return (
        <div className="container">
            <Header />
            <div className="App">
                <h1>Your Decks</h1>
                <ul className="decks">
                    {decks.map((deck) => (
                        <li key={deck._id}>
                            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
                            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleCreateDeck}>
                    <label htmlFor="deck-title">Deck Title</label>
                    <input 
                        id="deck-title"
                        type="text"
                        name="deck-title"
                        // for onChange, onClick on HTML element
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // TODO: save what the user typed
                            setTitle(e.target.value); 
                        }}
                        value={title}
                    /> 
                    <button>Create Deck</button>
                </form>
            </div>
        </div>
    )
}

export default App