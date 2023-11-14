import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getStatus(): {message: string, version: string} {
    return {
      message: 'API running',
      version: process.env.npm_package_version,
    };
  }
}
