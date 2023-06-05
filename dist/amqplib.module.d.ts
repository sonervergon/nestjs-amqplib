import { ModuleRef } from "@nestjs/core";
import { DynamicModule, OnModuleDestroy, OnApplicationBootstrap } from "@nestjs/common";
import { AmqpOptions, AsyncAmqpOptions } from "./amqplib.interface";
export declare class AmqplibModule implements OnModuleDestroy, OnApplicationBootstrap {
    private readonly moduleRef;
    private readonly connection;
    constructor(moduleRef: ModuleRef, connection: string);
    static forRootAsync({ name, ...options }: AsyncAmqpOptions): DynamicModule;
    static forRoot({ name, ...options }: AmqpOptions): DynamicModule;
    onApplicationBootstrap(): void;
    onModuleDestroy(): Promise<void>;
}
