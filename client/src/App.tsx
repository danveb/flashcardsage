import { useState, useEffect } from "react";
import "./App.css"; 

// TypeScript
type TDeck = {
    title: string, 
    _id: string, 
}

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
        await fetch("http://localhost:4000/decks", {
            method: "POST", 
            // stringified body
            body: JSON.stringify({
                title, 
            }),
            headers: {
                "Content-Type": "application/json", 
            },
        });
        // clear out input since async function
        setTitle(""); 
    };

    // useEffect
    useEffect(() => {
        const fetchDecks = async () => {
            // fetch returns an object that has a .json method
            const response = await fetch("http://localhost:4000/decks"); 
            // call response.json() 
            const newDecks = await response.json(); 
            // console.log(newDecks); // [...]
            setDecks(newDecks); 
        };
        fetchDecks(); 
    }, [])

    return (
        <div className="App">
            <ul className="decks">
                {decks.map((deck) => (
                    <li key={deck._id}>{deck.title}</li>
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
    )
}

export default App