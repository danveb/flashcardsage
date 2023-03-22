import { Request, Response } from "express"; 
import Deck from "../models/Deck"; 

export const deleteCardOnDeckController = async (req: Request, res: Response) => {
    const { deckId, index } = req.params; 
    // console.log(deckId); 
    // console.log(index); 
    const deck = await Deck.findById(deckId); 
    if(!deck) {
        return res.status(400).send("No deck with this ID exists"); 
    };
    deck.cards.splice(parseInt(index), 1); 
    await deck.save(); 
    res.json(deck); 
}; 