import { AuthRepository } from "../repositories/authRepository";

export class SignOutUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(): Promise<void> {
    await this.authRepository.signOut();
  }
}
