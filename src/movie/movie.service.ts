import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ILike, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { uploadImageSupabase } from 'src/libs/supabase/supabase';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto, cape: any, banner: any) {
    try {
      const movie = this.movieRepository.create(createMovieDto);
      if (cape) {
        const capeUrl = await uploadImageSupabase(cape);
        movie.cape = capeUrl;
      }
      if (banner) {
        const bannerUrl = await uploadImageSupabase(banner);
        movie.banner = bannerUrl;
      }
      return await this.movieRepository.save(movie);
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
        details: error.details,
      });
    }
  }

  async findAll(page: number, limit: number, title?: string) {
    try {
      page = page || 1;
      limit = limit || 10;
      const [result, total] = await this.movieRepository.findAndCount({
        where: {
          ...(title && { title: ILike(`%${title}%`) }),
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data: result,
      };
    } catch (error) {
      throw new NotFoundException('Invalid movies');
    }
  }

  async findOne(id: number) {
    try {
      const movie = await this.movieRepository.findOne({ where: { id } });
      if (!movie) {
        throw new NotFoundException('Invalid movies');
      }
      return movie;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
    cape: Express.Multer.File,
    banner: Express.Multer.File,
  ) {
    try {
      const movie = await this.findOne(id);
      if (!movie) {
        throw new BadRequestException({
          message: 'Movie not found',
        });
      }
      const movieUpdate = this.movieRepository.merge(movie, updateMovieDto);
      if (cape) {
        const capeUrl = await uploadImageSupabase(cape);
        movieUpdate.cape = capeUrl;
      }
      if (banner) {
        const bannerUrl = await uploadImageSupabase(banner);
        movieUpdate.banner = bannerUrl;
      }
      return await this.movieRepository.save(movieUpdate);
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
        details: error.details,
      });
    }
  }

  async remove(id: number) {
    try {
      const movie = await this.findOne(id);
      if (!movie) {
        throw new BadRequestException({
          message: 'Movie not found',
        });
      }
      return await this.movieRepository.remove(movie);
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
        details: error.details,
      });
    }
  }
}
