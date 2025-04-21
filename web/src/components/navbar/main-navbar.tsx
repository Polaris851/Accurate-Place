import { useLocation } from "react-router";
import { UserAvatar } from "./user-avatar";
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { useAuth } from "../../auth/use-auth";

export function MainNavBar() {
    const { pathname } = useLocation();

    const { user } = useAuth();

    return (
        <Navbar
            maxWidth={"xl"}
            isBordered
        >
            {user?.is_admin && (
                <>
                    <NavbarMenuToggle />
                    <NavbarMenu >
                        <NavbarMenuItem >
                            <Link
                                className="w-full"
                                href="/admin/hosts"
                                color={pathname === "/admin/hosts" ? "primary" : "foreground"}
                                size="lg"
                            >
                                Administrar Locações
                            </Link>
                            <Link
                                className="w-full"
                                href="/admin/clients"
                                color={pathname === "/admin/clients" ? "primary" : "foreground"}
                                size="lg"
                            >
                                Administrar Clientes
                            </Link>
                        </NavbarMenuItem >
                    </NavbarMenu>
                </>
            )}

            <NavbarBrand>
                <img className="size-8" src="/navbar-accurate-logo.svg" />
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem>
                    <UserAvatar />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}