import { useParams } from "react-router";
import { useUser } from "../api/get-user";

export function UserPage() {
    const params = useParams();

    const { user, isLoading } = useUser(Number(params?.userId))

    if (isLoading) {
        return <div>loading component</div>
    }

    if (user === undefined) {
        return <div>host não encontrado</div>
    }

    return (
        <h1>{user.name}</h1>
    )
}