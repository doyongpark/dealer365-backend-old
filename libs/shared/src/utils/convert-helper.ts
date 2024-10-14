import { Logger } from '@nestjs/common';

export function parseBoolean(value: string | undefined): boolean {
    const logger = new Logger('parseBoolean');
    if (value === undefined) {
        return false;
    }
    const pattern = /^(true|1|yes)$/i;
    return pattern.test(value.trim());
}

