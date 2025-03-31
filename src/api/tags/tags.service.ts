import { Injectable } from '@nestjs/common';
import { TagsResponseDto } from './dto/tags.response.dto';
import { TagsRepository } from './repositories/tags.repository';
import { IsNull } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}
  async getTags(): Promise<TagsResponseDto> {
    const tags = this.tagsRepository.find({
      where: { deletedAt: IsNull() },
      select: { name: true },
    });
    return tags.then((tags) => {
      return {
        tags: tags.map((tag) => tag.name),
      };
    });
  }
}
