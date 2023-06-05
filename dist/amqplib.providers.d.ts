import * as amqplib from "amqplib";
import { Logger } from "@nestjs/common";
import { AmqpOptions } from "./amqplib.interface";
export declare const createConnection: (connectionOptions: AmqpOptions["connectionOptions"], socketOptions: AmqpOptions["socketOptions"]) => Promise<amqplib.Connection>;
export declare const factory: (logger: Logger, options: AmqpOptions) => Promise<amqplib.Connection>;
