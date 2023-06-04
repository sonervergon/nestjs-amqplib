import { ModuleRef } from "@nestjs/core";
import { DynamicModule, OnModuleDestroy, OnApplicationBootstrap } from "@nestjs/common";
import { AsyncAmqpOptions } from "./amqplib.interface";
export declare class AmqplibModule implements OnModuleDestroy, OnApplicationBootstrap {
    private readonly moduleRef;
    constructor(moduleRef: ModuleRef);
    static forRootAsync(options: AsyncAmqpOptions): DynamicModule;
    onApplicationBootstrap(): void;
    onModuleDestroy(): Promise<void>;
}
