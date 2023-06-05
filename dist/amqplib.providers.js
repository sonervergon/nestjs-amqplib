"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = exports.createConnection = void 0;
const amqplib = require("amqplib");
const createConnection = async (connectionOptions, socketOptions) => {
    return await amqplib.connect(connectionOptions, socketOptions);
};
exports.createConnection = createConnection;
const factory = async (logger, options) => {
    try {
        const connection = await (0, exports.createConnection)(options.connectionOptions, options.socketOptions);
        logger.log("Connected to queue");
        return connection;
    }
    catch (error) {
        logger.error(error);
    }
};
exports.factory = factory;
//# sourceMappingURL=amqplib.providers.js.map