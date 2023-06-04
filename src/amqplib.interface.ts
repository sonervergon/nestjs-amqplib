import { ModuleMetadata } from "@nestjs/common";
import type { Options } from "amqplib";

export interface AmqpOptions {
  connectionOptions: Options.Connect | string;
  socketOptions?: any;
}

export interface AsyncAmqpOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (...args: any[]) => AmqpOptions | Promise<AmqpOptions>;
  inject?: any[];
}
