import { Connection } from "amqplib";
import { DiscoveryModule, ModuleRef } from "@nestjs/core";
import {
  DynamicModule,
  Global,
  Module,
  Logger,
  OnModuleDestroy,
} from "@nestjs/common";
import { AmqpOptions, AsyncAmqpOptions } from "amqplib.interface";
import {
  createAmqpProvider,
  createAsyncClientOptions,
} from "amqplib.providers";
import { AMQP_CLIENT, AMQP_MODULE_OPTIONS } from "amqplib.constants";

@Global()
@Module({
  imports: [DiscoveryModule],
})
export class AmqplibModule implements OnModuleDestroy {
  constructor(private readonly moduleRef: ModuleRef) {}
  logger = new Logger(AmqplibModule.name);
  private onConnect = () => this.logger.log("Connected to queue");
  private onError = (error: any) => this.logger.error(error);

  register(options: AmqpOptions): DynamicModule {
    return {
      module: AmqplibModule,
      providers: [
        createAmqpProvider(this.onConnect, this.onError),
        { provide: AMQP_MODULE_OPTIONS, useValue: options },
      ],
    };
  }
  forRootAsync(options: AsyncAmqpOptions): DynamicModule {
    return {
      module: AmqplibModule,
      imports: options.imports,
      providers: [
        createAmqpProvider(this.onConnect, this.onError),
        createAsyncClientOptions(options),
      ],
      exports: [],
    };
  }

  async onModuleDestroy() {
    const connection = this.moduleRef.get<Connection>(AMQP_CLIENT);
    await connection.close();
  }
}
