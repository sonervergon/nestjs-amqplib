import * as amqplib from "amqplib";
import { Provider } from "@nestjs/common";
import { AmqpOptions, AsyncAmqpOptions } from "./amqplib.interface";
import { AMQP_CLIENT, AMQP_MODULE_OPTIONS } from "./amqplib.constants";

export const createConnection = async (
  connectionOptions: AmqpOptions["connectionOptions"],
  socketOptions: AmqpOptions["socketOptions"]
) => {
  return await amqplib.connect(connectionOptions, socketOptions);
};

export const createAmqpProvider = (
  onConnect: () => void,
  onError: (error: any) => void
): Provider<amqplib.Connection> => {
  return {
    provide: AMQP_CLIENT,
    useFactory: async (options: AmqpOptions): Promise<amqplib.Connection> => {
      try {
        const connection = await createConnection(
          options.connectionOptions,
          options.socketOptions
        );
        onConnect();
        return connection;
      } catch (error) {
        onError(error);
      }
    },
    inject: [AMQP_MODULE_OPTIONS],
  };
};

export const createAsyncClientOptions = (options: AsyncAmqpOptions) => ({
  provide: AMQP_MODULE_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject,
});
