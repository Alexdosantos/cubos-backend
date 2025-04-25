import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty()
  title: string;

  @IsString({ message: 'titleOriginal must be a string' })
  @IsNotEmpty()
  titleOriginal: string;

  @IsString({ message: 'description must be a string' })
  @IsNotEmpty()
  description: string;

  @IsString({ message: 'sinopse must be a string' })
  @IsNotEmpty()
  sinopse: string;

  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'popularity must be a number' })
  @IsNotEmpty()
  popularity: number;

  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'votes must be a number' })
  @IsNotEmpty()
  votes: number;

  @IsString({ message: 'situation must be a string' })
  @IsNotEmpty()
  situation: string;

  @IsArray({ message: 'language must be an array' })
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (!value) return []; // Handle empty or undefined
    if (Array.isArray(value))
      return value.map((lang: string) => lang.trim()).filter(Boolean);
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((lang: string) => lang.trim())
        .filter(Boolean);
    }
    return [];
  })
  language: string[];

  @IsArray({ message: 'genre must be an array' })
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (!value) return []; // Handle empty or undefined
    if (Array.isArray(value))
      return value.map((genre: string) => genre.trim()).filter(Boolean);
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((genre: string) => genre.trim())
        .filter(Boolean);
    }
    return [];
  })
  genre: string[];

  @Type(() => Date)
  @IsDate({ message: 'launchDate must be a date' })
  @IsNotEmpty()
  launchDate: Date;

  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'duration must be a number' })
  @IsNotEmpty()
  duration: number;

  @IsNumber({}, { message: 'budget must be a number' })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  budget: number;

  @IsNumber({}, { message: 'revenue must be a number' })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  revenue: number;

  @IsNumber({}, { message: 'profit must be a number' })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  profit: number;

  @IsOptional()
  cape: string;

  @IsOptional()
  banner: string;

  @IsString({ message: 'trailer must be a string' })
  @IsNotEmpty()
  trailer: string;
}
