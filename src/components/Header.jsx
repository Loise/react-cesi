import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div>
            <NavLink to="/">Home page</NavLink>
            <NavLink to="/login">Login page</NavLink>
        </div>
    )
}