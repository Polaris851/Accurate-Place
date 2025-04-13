import { UserAvatar } from "./user-avatar";

export function MainNavBar() {
    return (
        <nav className={"bg-red-400 flex justify-between items-center px-4 py-1"}>
            <img src={"/navbar-accurate-logo.svg"}/>
            <input placeholder={"pesquisa fuzzy aqui"}/>
            <UserAvatar />
        </nav>
    )
}