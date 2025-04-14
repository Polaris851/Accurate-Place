import { NavLink } from "react-router";
import { UserAvatar } from "./user-avatar";

export function MainNavBar() {
    return (
        <nav className="bg-zinc-900 flex justify-between items-center px-10 py-1.5">
            <NavLink to="/">
                <img src="/navbar-accurate-logo.svg"/>
            </NavLink>
            <UserAvatar />
        </nav>
    )
}