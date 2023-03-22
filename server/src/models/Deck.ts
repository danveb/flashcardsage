import mongoose from "mongoose"; 
const Schema = mongoose.Schema; 
// const ObjectId = mongoose.Types.ObjectId; 

// set up Mongoose Schema/Model
const DeckSchema = new Schema({
    title: String, 
    cards: [String], 
});

const DeckModel = mongoose.model("Deck", DeckSchema); 

export default DeckModel