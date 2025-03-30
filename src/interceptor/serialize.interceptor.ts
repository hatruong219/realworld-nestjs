import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const responseKey = this.getResponseKey(request);
    return next.handle().pipe(
      map((data: ClassConstructor) => {
        return {
          [responseKey]: plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          }),
        };
      }),
    );
  }

  private getResponseKey(request: any): string {
    const routePath = request.route?.path || '';
    let key = routePath.split('/')[2] || 'data';

    if (request.method !== 'GET' && key.endsWith('s')) {
      key = key.slice(0, -1);
    }
    return key;
  }
}
