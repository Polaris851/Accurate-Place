import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import { useAuth } from "../../auth/use-auth";
import { useNavigate } from "react-router";
import { api } from "../../lib/axios";

export function UserAvatar() {
    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    function logout()  {
        navigate("/login");
        localStorage.removeItem("access_token");
        api.defaults.headers.common["Authorization"] = undefined;
        setUser(null);
    }

    return (
        <Dropdown placement={"bottom-end"}>
            <DropdownTrigger>
                <User
                    name={user?.name}
                    avatarProps={{
                        showFallback: true,
                        src: `https://robohash.org/${user?.id}`
                    }}
                />
            </DropdownTrigger>
            <DropdownMenu color={"danger"} variant={"flat"}>
                <DropdownItem onPress={logout} key={"logout"}>Sair</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}