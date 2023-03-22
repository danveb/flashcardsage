import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export const getDeck = async (deckId: string): Promise<TDeck> => {
    // fetch returns an object that has a .json method
    const response = await fetch(`${API_URL}/decks/${deckId}`); 
    return response.json(); 
};