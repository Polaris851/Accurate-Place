import { Input as HeroInput, InputProps } from "@heroui/react";

export function Input(props: InputProps) {
    return (
        <HeroInput
            size={"lg"}
            color={"default"}
            {...props}
        />
    )
}