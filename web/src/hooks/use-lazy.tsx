import { useEffect, useState } from "react";

interface LazyProps<T> {
    fn: () => Promise<T>;
}

export function useLazy<T>(props: LazyProps<T>) {
    const { fn } = props;

    const [data, setData] = useState<T | undefined>();
    const [errors, setErrors] = useState<unknown>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        fn()
            .then((response) => {
                setData(response);

                setIsLoading(false);
            })
            .catch((err) => {
                setErrors(err);

                setIsLoading(false);
            })
    }, []);

    return {
        data,
        errors,
        isLoading
    };
}