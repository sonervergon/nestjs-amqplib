"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AmqplibModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqplibModule = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const amqplib_providers_1 = require("./amqplib.providers");
const amqplib_constants_1 = require("./amqplib.constants");
let AmqplibModule = exports.AmqplibModule = AmqplibModule_1 = class AmqplibModule {
    constructor(moduleRef, connection) {
        this.moduleRef = moduleRef;
        this.connection = connection;
    }
    static forRootAsync({ name, ...options }) {
        const connectionName = (0, amqplib_constants_1.createAmqpConnectionName)(name);
        return {
            module: AmqplibModule_1,
            imports: options.imports,
            providers: [
                {
                    provide: connectionName,
                    useFactory: amqplib_providers_1.factory,
                    inject: [common_1.Logger, amqplib_constants_1.AMQP_MODULE_OPTIONS],
                },
                {
                    provide: amqplib_constants_1.AMQP_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                { provide: amqplib_constants_1.AMQP_CONNECTION, useValue: connectionName },
            ],
            exports: [],
        };
    }
    static forRoot({ name, ...options }) {
        const connectionName = (0, amqplib_constants_1.createAmqpConnectionName)(name);
        return {
            module: AmqplibModule_1,
            providers: [
                {
                    provide: connectionName,
                    useFactory: (logger) => (0, amqplib_providers_1.factory)(logger, options),
                    inject: [common_1.Logger],
                },
                { provide: amqplib_constants_1.AMQP_CONNECTION, useValue: connectionName },
            ],
        };
    }
    onApplicationBootstrap() {
        console.log(this.connection);
    }
    async onModuleDestroy() {
        const connection = this.moduleRef.get(amqplib_constants_1.AMQP_CONNECTION);
        await connection.close();
    }
};
exports.AmqplibModule = AmqplibModule = AmqplibModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [core_1.DiscoveryModule],
        providers: [common_1.Logger],
    }),
    __param(1, (0, common_1.Inject)(amqplib_constants_1.AMQP_CONNECTION)),
    __metadata("design:paramtypes", [core_1.ModuleRef, String])
], AmqplibModule);
//# sourceMappingURL=amqplib.module.js.map