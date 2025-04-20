import { UserAvatar } from "./user-avatar";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";

export function MainNavBar() {
    return (
        <Navbar
            maxWidth={"xl"}
        >
             <NavbarBrand>
                <img src="/navbar-accurate-logo.svg"/>
             </NavbarBrand>
             <NavbarContent justify="end">
                <NavbarItem>
                    <UserAvatar />
                </NavbarItem>
             </NavbarContent>
        </Navbar>
    )
}