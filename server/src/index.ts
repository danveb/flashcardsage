// for typescript we can use import (MODULES) by default

import express, { Request, Response } from "express"; 
import "dotenv/config"; 
import mongoose from "mongoose";
import Deck from "./models/Deck"; 
import cors from "cors"; 
const PORT = process.env.PORT || 8801; 

const app = express(); 

// add different support for payloads
// middleware function (express.json())
// middleware function (cors()) 
app.use(express.json()); 
app.use(cors()); 

// add types to req/res for typescript
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World"); 
}); 

// GET /decks 
app.get("/decks", async (req: Request, res: Response) => {
    // TODO: fetch all decks and send back to user
    // 1. how do we fetch the decks from mongo?
    const decks = await Deck.find(); 
    // console.log(decks); 
    // 2. how do we send back the array to the ui? 
    res.json(decks); 
});

// POST /decks 
// send data to endpoint and persist in db
app.post("/decks", async (req: Request, res: Response) => {
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
});

// connect mongoose to mongodb
// use .env 
const db = mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        console.log(`Listening on port ${PORT}`);
        app.listen(PORT); 
    });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// });
