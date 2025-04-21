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
                        <NavbarMenuItem>
                            <Link
                                href="/"
                                className="w-full"
                                color={pathname === "/" ? "primary" : "foreground"}
                                size="lg"
                            >
                                Vizualizar Locações
                            </Link>
                            <Link
                                href="/admin/hosts"
                                className="w-full"
                                color={pathname === "/admin/hosts" ? "primary" : "foreground"}
                                size="lg"
                            >
                                Administrar Locações
                            </Link>
                            <Link
                                href="/admin/clients"
                                className="w-full"
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
                <Link href="/">
                    <img className="size-8" src="/navbar-accurate-logo.svg" />
                </Link>
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem>
                    <UserAvatar />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}