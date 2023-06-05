import { ModuleMetadata } from "@nestjs/common";
import type { Options } from "amqplib";

export interface AmqpOptions {
  connectionOptions: Options.Connect | string;
  socketOptions?: any;
  name?: string;
}

export interface AsyncAmqpOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (...args: any[]) => AmqpOptions | Promise<AmqpOptions>;
  inject?: any[];
  name: string;
}
