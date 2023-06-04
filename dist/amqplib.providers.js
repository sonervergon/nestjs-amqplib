"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsyncClientOptions = exports.createAmqpProvider = exports.createConnection = void 0;
const amqplib = require("amqplib");
const common_1 = require("@nestjs/common");
const amqplib_constants_1 = require("./amqplib.constants");
const createConnection = async (connectionOptions, socketOptions) => {
    return await amqplib.connect(connectionOptions, socketOptions);
};
exports.createConnection = createConnection;
const createAmqpProvider = () => {
    return {
        provide: amqplib_constants_1.AMQP_CLIENT,
        useFactory: async (logger, options) => {
            try {
                const connection = await (0, exports.createConnection)(options.connectionOptions, options.socketOptions);
                logger.log("Connected to queue");
                return connection;
            }
            catch (error) {
                logger.error(error);
            }
        },
        inject: [common_1.Logger, amqplib_constants_1.AMQP_MODULE_OPTIONS],
    };
};
exports.createAmqpProvider = createAmqpProvider;
const createAsyncClientOptions = (options) => ({
    provide: amqplib_constants_1.AMQP_MODULE_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject,
});
exports.createAsyncClientOptions = createAsyncClientOptions;
//# sourceMappingURL=amqplib.providers.js.map