export function UserAvatar() {
    return (
        <div>
            <img
                src={`https://robohash.org/${Math.random()}`}
                width={35}
                className={"rounded-full bg-zinc-100"}
            />
        </div>
    )
}