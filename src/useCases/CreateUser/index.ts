import MailTrapMailProvider from "../../providers/implementations/MailTrapMailProvider";
import PostgresUsersRepository from "../../repositories/implementations/PostgresUsersRepository";
import CreateUserController from "./CreateUserController";
import CreateUserUseCase from "./CreateUserUseCase";

const createUserUseCase = new CreateUserUseCase(
  new PostgresUsersRepository(),
  new MailTrapMailProvider()
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
