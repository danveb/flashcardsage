import { Request, Response } from "express";
import Deck from "../models/Deck"; 

export const createDeckController = async (req: Request, res: Response) => {
    // res.send("Hello from /decks endpoint"); 
    // req.body for our custom "title" 
    // console.log(req.body); 
    const { title } = req.body; 
    // instantiate a new Deck 
    const newDeck = new Deck({
        title: title, 
    });
    // save to db (async/await since working with db)
    const createdDeck = await newDeck.save(); 
    res.json(createdDeck); // status 200, title and unique _id
}; 