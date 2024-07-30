import { UserEntity } from "@/lib/domain/entities/userEntity";

import { Either } from "fp-ts/lib/Either";

export type AuthStateType = {
  user: UserEntity | null;
  loginWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export type UserEntityType = Either<Error, UserEntity>;
