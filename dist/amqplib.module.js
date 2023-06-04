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
var AmqplibModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmqplibModule = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const amqplib_providers_1 = require("./amqplib.providers");
const amqplib_constants_1 = require("./amqplib.constants");
let AmqplibModule = exports.AmqplibModule = AmqplibModule_1 = class AmqplibModule {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
    static forRootAsync(options) {
        return {
            module: AmqplibModule_1,
            imports: options.imports,
            providers: [(0, amqplib_providers_1.createAmqpProvider)(), (0, amqplib_providers_1.createAsyncClientOptions)(options)],
            exports: [],
        };
    }
    onApplicationBootstrap() { }
    async onModuleDestroy() {
        const connection = this.moduleRef.get(amqplib_constants_1.AMQP_CLIENT);
        await connection.close();
    }
};
exports.AmqplibModule = AmqplibModule = AmqplibModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [core_1.DiscoveryModule],
        providers: [common_1.Logger],
    }),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], AmqplibModule);
//# sourceMappingURL=amqplib.module.js.map