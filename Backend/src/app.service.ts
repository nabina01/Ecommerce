//business logic ,data transport ,database interaction, external api calls,core funcationality
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('From App Service');
    return 'Hello World! from appservice';
  }
}
