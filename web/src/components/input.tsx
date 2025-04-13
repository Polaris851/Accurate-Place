interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

export function Input(props: InputProps) {
    const { name, type, placeholder, ...inputProps } = props;

    return (
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <input
                {...inputProps}
                type={type}
                name={name}
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                placeholder={placeholder}
            />
        </div>
        
    )
}