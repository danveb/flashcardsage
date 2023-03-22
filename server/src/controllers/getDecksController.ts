import { Request, Response } from "express"; 
import Deck from "../models/Deck";

export const getDecksController = async (req: Request, res: Response) => {
    // TODO: fetch all decks and send back to user
    // 1. how do we fetch the decks from mongo?
    const decks = await Deck.find(); 
    // console.log(decks); 
    // 2. how do we send back the array to the ui? 
    res.json(decks); 
};