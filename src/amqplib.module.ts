import { Connection } from "amqplib";
import { DiscoveryModule, ModuleRef } from "@nestjs/core";
import {
  DynamicModule,
  Global,
  Module,
  Logger,
  OnModuleDestroy,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { AsyncAmqpOptions } from "./amqplib.interface";
import {
  createAmqpProvider,
  createAsyncClientOptions,
} from "./amqplib.providers";
import { AMQP_CLIENT } from "./amqplib.constants";

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [Logger],
})
export class AmqplibModule implements OnModuleDestroy, OnApplicationBootstrap {
  constructor(private readonly moduleRef: ModuleRef) {}

  static forRootAsync(options: AsyncAmqpOptions): DynamicModule {
    return {
      module: AmqplibModule,
      imports: options.imports,
      providers: [createAmqpProvider(), createAsyncClientOptions(options)],
      exports: [],
    };
  }

  onApplicationBootstrap() {}

  async onModuleDestroy() {
    const connection = this.moduleRef.get<Connection>(AMQP_CLIENT);
    await connection.close();
  }
}
