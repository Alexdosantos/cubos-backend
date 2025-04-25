import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'cape',
        maxCount: 1,
      },
      {
        name: 'banner',
        maxCount: 1,
      },
    ]),
  )
  @Post('create')
  create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFiles()
    files: { cape: Express.Multer.File; banner: Express.Multer.File },
  ) {
    const cape = files.cape?.[0];
    const banner = files.banner?.[0];
    return this.movieService.create(createMovieDto, cape, banner);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: number,
    @Query('title') title?: string,
  ) {
    return this.movieService.findAll(+page, +limit, title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'cape',
        maxCount: 1,
      },
      {
        name: 'banner',
        maxCount: 1,
      },
    ]),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFiles()
    files: { cape: Express.Multer.File; banner: Express.Multer.File },
  ) {
    const cape = files.cape?.[0];
    const banner = files.banner?.[0];
    return this.movieService.update(+id, updateMovieDto, cape, banner);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
