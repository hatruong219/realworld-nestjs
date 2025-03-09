import { ClassSerializerInterceptor } from "@nestjs/common";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

// export class UserInfoReponse {
//   user: UserDetailInfo;
// }
export class UserInfoReponse {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  userName: string;

  @Expose()
  @IsString()
  bio: string;

  @Expose()
  @IsString()
  image: string;
}
