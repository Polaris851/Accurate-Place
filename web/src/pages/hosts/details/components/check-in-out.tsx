import styles from "./check-in-out.module.css";

interface CheckInOutProps {
    from: Date | undefined;
    to: Date | undefined;
}

export function CheckInOut(props: CheckInOutProps) {
    const { from, to } = props;

    return (
        <div className={styles.container}>
            <div className={styles.checkInButton}>{from?.toLocaleDateString("pt-BR") ?? "Check-in"}</div>
            <div className={styles.checkInButton}>{to?.toLocaleDateString("pt-BR") ?? "Check-out"}</div>
        </div>
    )
}