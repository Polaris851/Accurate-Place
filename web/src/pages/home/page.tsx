import { FileChartLine, MapPinHouse, UsersRound } from "lucide-react";
import { ReactNode } from "react";
import { NavLink } from "react-router";

const links = [
  {
    to: "/admin/hosts",
    icon: <MapPinHouse className="size-5 text-zinc-200" />,
    label: "Tipos de Locações",
  },
  {
    to: "/admin/clients",
    icon: <UsersRound className="size-5 text-zinc-200" />,
    label: "Clientes",
  },
  {
    to: "/reservation",
    icon: <FileChartLine className="size-5 text-zinc-200" />,
    label: "Reservas",
  },
];

const DashboardCard = ({ to, icon, label }: { to: string; icon: ReactNode; label: string }) => (
  <NavLink
    to={to}
    className="rounded-2xl bg-zinc-800 p-6 flex flex-col items-center justify-center gap-3 overflow-hidden transition-all duration-200 hover:ring-2 hover:ring-primary-200 hover:scale-[1.02]"
  >
    <p className="flex items-center gap-2 text-zinc-200 text-lg font-semibold">
      {icon}
      {label}
    </p>
  </NavLink>
);

export function Home() {
  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6 px-4">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 auto-rows-[130px]">
      {links.map((link) => (
          <DashboardCard key={link.to} {...link} />
        ))}
      </div>
    </div>
  );
}