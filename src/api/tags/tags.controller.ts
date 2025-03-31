import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResponseDto } from './dto/tags.response.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('api')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Public()
  @Get('tags')
  async getTags(): Promise<TagsResponseDto> {
    return this.tagsService.getTags();
  }
}
