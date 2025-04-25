import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Email is required' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Password is required' })
  password: string;
}
