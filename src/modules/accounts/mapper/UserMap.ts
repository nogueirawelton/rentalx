import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../entities/User";

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
  }: User): IUserResponseDTO {
    const avatar_url =
      process.env.DISK === "s3Storage"
        ? `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`
        : `${process.env.APP_API_URL}/avatar/${avatar}`;
    return {
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    };
  }
}
