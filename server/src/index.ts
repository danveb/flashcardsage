// for typescript we can use import (MODULES) by default

import express, { Request, Response } from "express"; 
import mongoose from "mongoose";
import Deck from "./models/Deck"; 
const PORT = process.env.PORT || 8801; 

const app = express(); 

// add different support for payloads
// middleware function (express.json())
app.use(express.json()); 

// add types to req/res for typescript
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World"); 
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
    .connect("mongodb+srv://danveb:nUUvXwYP4nUzAFqk@cluster0.hahfb1p.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log(`Listening on port ${PORT}`);
        app.listen(PORT); 
    });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// });
