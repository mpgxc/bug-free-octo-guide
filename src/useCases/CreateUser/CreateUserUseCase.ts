import User from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const useAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (useAlreadyExists) {
      throw new Error("User already exists!");
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "equipe",
        email: "help@empresa.com",
      },
      body: "Olá você precisa disso hein!",
      subject: "Voce foi cadastrado hein!",
    });
  }
}

export default CreateUserUseCase;
