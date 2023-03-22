import { Request, Response } from "express"; 
import Deck from "../models/Deck"; 

export const createCardForDeckController = async (req: Request, res: Response) => {
    // TODO
    // 1. get deck id from params 
    const { deckId } = req.params; 
    // 2. find deckId on db 
    const deck = await Deck.findById(deckId); 
    if(!deck) {
        return res.status(400).send("No deck of this id exist"); 
    }; 
    // 3. create card info 
    const { text } = req.body; 
    // 4. push body tp [] 
    deck.cards.push(text);
    // 5. save to db 
    await deck.save(); 
    // 6. return deck 
    res.json(deck); 
}; 