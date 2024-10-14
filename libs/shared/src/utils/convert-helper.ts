export function parseBoolean(value: string | null | undefined, defaultValue: boolean = false): boolean {
    if (value === null || value === undefined || value.trim() === '') {
        return defaultValue;
    }
    const pattern = /^(true|1|yes)$/i;
    return pattern.test(value.trim());
}