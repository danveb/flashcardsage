import { API_URL } from "./config";

export type TDeck = {
    title: string, 
    cards: string[], 
    _id: string, 
}

export const getDecks = async (): Promise<TDeck[]> => {
    // fetch returns an object that has a .json method
    const response = await fetch(`${API_URL}/decks`); 
    return response.json(); 
};