import { useClients } from "./api/get-clients";
import { AddClientContainer } from "./components/add-client";
import { CardClient } from "./components/card-client";

export function ClientsPage() {
  const { clients, isLoading } = useClients()

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6 px-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-zinc-100 text-3xl font-semibold">Clientes</h1>
        <AddClientContainer />
      </div>
      <div className="flow-root space-y-3">
        {
          clients?.map(client =>
            <CardClient
              key={client.id}
              clientId={client.id}
              name={client.name}
            />
          )
        }
      </div>
    </div>
  );
}