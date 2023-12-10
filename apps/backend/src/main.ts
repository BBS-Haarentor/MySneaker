import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('MySneaker API')
    .setDescription('The MySneaker API')
    .setVersion(process.env.npm_package_version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: function (a, b) {
        const order = {
          get: '0',
          put: '1',
          post: '2',
          delete: '3',
        };
        return order[
          a._root.entries.filter(
            (value: string[]) => value[0] === 'method',
          )[0][1]
          ].localeCompare(
          order[
            b._root.entries.filter(
              (value: string[]) => value[0] === 'method',
            )[0][1]
            ],
        );
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
