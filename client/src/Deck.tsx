import { useState, useEffect } from "react"; 
import { TDeck } from "./api/getDecks"; 
import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";
import { useParams } from "react-router-dom";
import { deleteCard } from "./api/deleteCard";
import "./Deck.css"; 
import { Header } from "./Header";

export default function Deck() {
    // useState
    const [text, setText] = useState(""); 
    const [cards, setCards] = useState<string[]>([]); 
    const [deck, setDeck] = useState<TDeck | undefined>(); 

    // useParams 
    const { deckId } = useParams(); 

    // handleCreateDeck
    const handleCreateDeck = async (e: React.FormEvent) => {
        // prevent default form submit behavior
        e.preventDefault(); 
        const { cards: serverCards } = await createCard(deckId!, text); 
        setCards(serverCards); 
        setText(""); 
    };

    // handleDeleteCard 
    const handleDeleteCard = async (index: number) => {
        if(!deckId) return; 
        const newDeck = await deleteCard(deckId, index); 
        setCards(newDeck.cards); 
    };

    // useEffect
    useEffect(() => {
        const fetchDeck = async () => {
            if(!deckId) return; 
            const newDeck = await getDeck(deckId); 
            setDeck(newDeck); 
            setCards(newDeck.cards); 
        };
        fetchDeck(); 
    }, [deckId])

    return (
        <>
            <Header />
            <div className="Deck">
                <ul className="cards">
                    {cards.map((card, index) => (
                        <li key={index}>
                            <button onClick={() => handleDeleteCard(index)}>X</button>
                            {card}
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleCreateDeck}>
                    <label htmlFor="card-text">Card Text</label>
                    <input 
                        id="card-text"
                        type="text"
                        name="card-text"
                        // for onChange, onClick on HTML element
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            // TODO: save what the user typed
                            setText(e.target.value); 
                        }}
                        value={text}
                    /> 
                    <button>Create Card</button>
                </form>
            </div>
        </>
    )
}