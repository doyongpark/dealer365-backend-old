import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        Logger.log(this.constructor.name);
        Logger.error(`${this.constructor.name}: ${exception.message}`);
    }
}