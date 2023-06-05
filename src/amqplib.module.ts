import { Connection } from "amqplib";
import { DiscoveryModule, ModuleRef } from "@nestjs/core";
import {
  DynamicModule,
  Global,
  Module,
  Logger,
  OnModuleDestroy,
  OnApplicationBootstrap,
  Inject,
} from "@nestjs/common";
import { AmqpOptions, AsyncAmqpOptions } from "./amqplib.interface";
import { factory } from "./amqplib.providers";
import {
  AMQP_CONNECTION,
  createAmqpConnectionName,
  AMQP_MODULE_OPTIONS,
} from "./amqplib.constants";

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [Logger],
})
export class AmqplibModule implements OnModuleDestroy, OnApplicationBootstrap {
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(AMQP_CONNECTION) private readonly connection: string
  ) {}

  static forRootAsync({ name, ...options }: AsyncAmqpOptions): DynamicModule {
    const connectionName = createAmqpConnectionName(name);
    return {
      module: AmqplibModule,
      imports: options.imports,
      providers: [
        {
          provide: connectionName,
          useFactory: factory,
          inject: [Logger, AMQP_MODULE_OPTIONS],
        },
        {
          provide: AMQP_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        { provide: AMQP_CONNECTION, useValue: connectionName },
      ],
      exports: [],
    };
  }

  static forRoot({ name, ...options }: AmqpOptions): DynamicModule {
    const connectionName = createAmqpConnectionName(name);
    return {
      module: AmqplibModule,
      providers: [
        {
          provide: connectionName,
          useFactory: (logger: Logger) => factory(logger, options),
          inject: [Logger],
        },
        { provide: AMQP_CONNECTION, useValue: connectionName },
      ],
    };
  }

  onApplicationBootstrap() {
    console.log(this.connection);
  }

  async onModuleDestroy() {
    const connection = this.moduleRef.get<Connection>(AMQP_CONNECTION);
    await connection.close();
  }
}
