// for typescript we can use import (MODULES) by default

import express, { Request, Response } from "express"; 
import "dotenv/config"; 
import mongoose from "mongoose";
import Deck from "./models/Deck"; 
import cors from "cors"; 
const PORT = process.env.PORT || 8801; 
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

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
app.get("/decks", getDecksController);

// POST /decks 
// send data to endpoint and persist in db
app.post("/decks", createDeckController); 

// DELETE /decks/:id
// delete deck from db 
app.delete("/decks/:deckId", deleteDeckController);

// POST /decks/:deckId/cards
app.post("/decks/:deckId/cards", createCardForDeckController); 

// GET /decks/:deckId
app.get("/decks/:deckId", getDeckController); 

// DELETE /decks/:deckId/cards/:cardId
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController); 

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
