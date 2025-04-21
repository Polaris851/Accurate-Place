export function getMessageFromError(message: string | string[]) {
    if (!Array.isArray(message)) {
        return message;
    }

    if (message.length > 0) {
        return message[0];
    }

    return "Ocorreu um erro";
}