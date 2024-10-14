export function parseBoolean(value: string | undefined): boolean {
    if (value === undefined) {
        return false;
    }
    const pattern = /^(true|1|yes)$/i;
    return pattern.test(value.trim());
}

