import { Request, Response } from "express"; 
import Deck from "../models/Deck"; 

export const deleteDeckController = async (req: Request, res: Response) => {
    // TODO
    // 1. get deck id from url 
    const { deckId } = req.params; 
    // 2. delete deck from db 
    const deck = await Deck.findByIdAndDelete(deckId); 
    // 3. return deleted deck to the user who made request 
    res.json({
        message: "Successfully deleted the entry", 
        deck, 
    }); 
}; 