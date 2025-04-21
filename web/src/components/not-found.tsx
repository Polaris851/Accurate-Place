export function NotFound() {
    return (
        <div
            className={"w-full flex items-center justify-center mt-5 flex-col gap-4"}
        >
            <img src={"/notfound.svg"} width={200} />
            <h1 className={"text-zinc-100 font-semibold text-2xl"}>Nada foi encontrado :(</h1>
        </div>
    );
}