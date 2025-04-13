import { useParams } from "react-router"

export function HostPage() {
    const params = useParams();

    console.log(params);

    return (
        <div>
            <div>
                <h1>hjost title</h1>
                <div>compartilhar</div>
            </div>

            <div>
                <div>
                    <div>tipo</div>
                    <div>total de reservas já feitas!</div>
                    <div>descricao</div>
                </div>
                
                <div>
                    componente com calendário e dados para efetivar a reserva
                </div>
            </div>
        </div>
    )
}