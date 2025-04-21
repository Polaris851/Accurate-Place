import { Button as HeroButton, ButtonProps } from "@heroui/react";

export function Button(props: ButtonProps) {
    const { children, ...rest } = props;

    return (
        <HeroButton
            color={"primary"}
            {...rest}
        >
            {children}
        </HeroButton>
    )
}