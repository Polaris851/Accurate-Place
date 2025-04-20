import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import { useAuth } from "../../auth/use-auth";
import { useNavigate } from "react-router";
import { api } from "../../lib/axios";

export function UserAvatar() {
    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    function logout()  {
        localStorage.removeItem("access_token");
        api.defaults.headers.common["Authorization"] = undefined;
        setUser(null);
        
        location.reload();
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
            <DropdownMenu variant={"flat"}>
                <DropdownItem onPress={() => navigate(`/client/${user?.id}`)} key={"profile"}>Meu perfil</DropdownItem>
                <DropdownItem onPress={() => navigate("/my-reservations")} key={"view-reservations"}>Minhas reservas</DropdownItem>
                <DropdownItem color={"danger"} onPress={logout} key={"logout"}>Sair</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}