import authConfig from "@config/auth";
import AppError from "@core/domain/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "@features/users/domain/repositories/IUserRepository";
import { ICreateSessions } from "../domain/models/ICreateSessions";
import { IUserAuthenticated } from "../domain/models/IUserAuthenticated";

@injectable()
class CreateSessionsService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessions): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
