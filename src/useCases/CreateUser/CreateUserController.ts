import { Request, Response } from "express";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import CreateUserUseCase from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body as ICreateUserRequestDTO;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        error: err.message || "Unexpected error",
      });
    }
  }
}

export default CreateUserController;
