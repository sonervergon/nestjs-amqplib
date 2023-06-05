import * as amqplib from "amqplib";
import { Logger, Provider } from "@nestjs/common";
import { AmqpOptions, AsyncAmqpOptions } from "./amqplib.interface";
import { AMQP_CONNECTION, AMQP_MODULE_OPTIONS } from "./amqplib.constants";

export const createConnection = async (
  connectionOptions: AmqpOptions["connectionOptions"],
  socketOptions: AmqpOptions["socketOptions"]
) => {
  return await amqplib.connect(connectionOptions, socketOptions);
};

export const factory = async (
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
};
