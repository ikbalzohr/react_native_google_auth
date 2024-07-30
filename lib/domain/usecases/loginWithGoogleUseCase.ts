import { AuthRepository } from "@/lib/domain/repositories/authRepository";
import { UserEntityType } from "@/lib/types/authTypes";

export class LoginWithGoogleUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(): Promise<UserEntityType> {
    return await this.authRepository.loginWithGoogle();
  }
}
