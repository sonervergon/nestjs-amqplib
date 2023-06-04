import * as amqplib from "amqplib";
import { Provider } from "@nestjs/common";
import { AmqpOptions, AsyncAmqpOptions } from "./amqplib.interface";
export declare const createConnection: (connectionOptions: AmqpOptions["connectionOptions"], socketOptions: AmqpOptions["socketOptions"]) => Promise<amqplib.Connection>;
export declare const createAmqpProvider: () => Provider<amqplib.Connection>;
export declare const createAsyncClientOptions: (options: AsyncAmqpOptions) => {
    provide: string;
    useFactory: (...args: any[]) => AmqpOptions | Promise<AmqpOptions>;
    inject: any[];
};
