import { Link } from "react-router-dom"; 
import "./Header.css"; 

export function Header() {
    return (
        <div className="Header">
            <div className="container">
                <div>
                    <Link to="/">Flashcard Sage</Link>
                </div>
                <div>
                    <Link to="/decks">Decks</Link>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}