import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Name is required' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Email is required' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Password is required' })
  password: string;
}
