import * as amqplib from "amqplib";
import { Logger, Provider } from "@nestjs/common";
import { AmqpOptions, AsyncAmqpOptions } from "./amqplib.interface";
import { AMQP_CLIENT, AMQP_MODULE_OPTIONS } from "./amqplib.constants";

export const createConnection = async (
  connectionOptions: AmqpOptions["connectionOptions"],
  socketOptions: AmqpOptions["socketOptions"]
) => {
  return await amqplib.connect(connectionOptions, socketOptions);
};

export const createAmqpProvider = (): Provider<amqplib.Connection> => {
  return {
    provide: AMQP_CLIENT,
    useFactory: async (
      logger: Logger,
      options: AmqpOptions
    ): Promise<amqplib.Connection> => {
      try {
        const connection = await createConnection(
          options.connectionOptions,
          options.socketOptions
        );
        logger.log("Connected to queue");
        return connection;
      } catch (error) {
        logger.error(error);
      }
    },
    inject: [Logger, AMQP_MODULE_OPTIONS],
  };
};

export const createAsyncClientOptions = (options: AsyncAmqpOptions) => ({
  provide: AMQP_MODULE_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject,
});
