import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticlesRepository } from './repositories/articles.repository';
import { UserBasicInfoDto } from '../users/dto/basic-info.dto';
import { ArticleDto, QueryArticlesDto } from './dto/articles.input.dto';
import { UsersRepository } from '../users/repositories/users.repository';
import { CreateArticleDto } from './dto/article.input.dto';
import { IsNull } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TagsRepository } from '../tags/repositories/tags.repository';
import { UpdateArticleDto } from './dto/update-article.input.dto';
import { PageDto, PageMetaDto } from '../common/pagination/page.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly acticlesRepository: ArticlesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly tagsRepository: TagsRepository,
  ) {}

  async getArticles(
    currentUser: UserBasicInfoDto,
    queryArticlesDto: QueryArticlesDto,
  ): Promise<PageDto<ArticleEntity>> {
    const { limmit, skip, order, tag, author, favorited } = queryArticlesDto;

    const whereCondition: any = {};

    if (tag) {
      whereCondition.tags = { name: tag };
    }
    if (author) {
      whereCondition.author = { username: author };
    }
    if (favorited) {
      whereCondition.favorites = { username: favorited };
    }

    const [articles, itemCount] = await this.acticlesRepository.findAndCount({
      where: whereCondition,
      order: { createdAt: order },
      skip,
      take: limmit,
      relations: {author: true, tags: true}
    });

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: queryArticlesDto,
    });

    return new PageDto(articles, pageMetaDto);
  }

  async createArticle(
    currentUser: UserBasicInfoDto,
    createArticle: CreateArticleDto,
  ): Promise<ArticleDto> {
    const user = await this.usersRepository.findOneBy({
      id: currentUser.userId,
      deletedAt: IsNull(),
    });
    if (!user) {
      throw new BadRequestException('Email or password wrong!!!');
    }
    const tags = await Promise.all(
      (createArticle.tags ?? []).map(async (tagName) => {
        let tag = await this.tagsRepository.findOneBy({
          name: tagName,
          deletedAt: IsNull(),
        });
        if (!tag) {
          tag = this.tagsRepository.create({ name: tagName });
          await this.tagsRepository.save(tag);
        }
        return tag;
      }),
    );
    const newArticle = this.acticlesRepository.create({
      ...createArticle,
      slug: this.generateSlug(createArticle.title),
      tags,
      author: user,
    });

    const aritcle = await this.acticlesRepository.save(newArticle);
    return plainToInstance(ArticleDto, aritcle, {
      excludeExtraneousValues: true,
    });
  }

  async getArticle(slug: string): Promise<ArticleDto> {
    const article = await this.acticlesRepository.findOne({
      where: { slug: slug, deletedAt: IsNull() },
      relations: {tags: true, author: true},
    });

    if (!article) {
      throw new BadRequestException('Article not found');
    }
    return plainToInstance(ArticleDto, article, {
      excludeExtraneousValues: true,
    });
  }

  async updateArticle(
    currentUser: UserBasicInfoDto,
    slug: string,
    createArticle: UpdateArticleDto,
  ): Promise<ArticleDto> {
    const user = await this.usersRepository.findOneBy({
      id: currentUser.userId,
      deletedAt: IsNull(),
    });
    if (!user) {
      throw new BadRequestException('Email or password wrong!!!');
    }
    const article = await this.acticlesRepository.findOne({
      where: { slug: slug, deletedAt: IsNull() },
      relations: {tags: true, author: true},
    });
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    const tags = await Promise.all(
      (createArticle.tags ?? []).map(async (tagName) => {
        let tag = await this.tagsRepository.findOneBy({
          name: tagName,
          deletedAt: IsNull(),
        });
        if (!tag) {
          tag = this.tagsRepository.create({ name: tagName });
          await this.tagsRepository.save(tag);
        }
        return tag;
      }),
    );
    const updatedArticle = this.acticlesRepository.create({
      ...article,
      ...createArticle,
      slug:
        article.title === createArticle.title
          ? this.generateSlug(createArticle.title)
          : article.slug,
      tags,
    });
    const savedArticle = await this.acticlesRepository.save(updatedArticle);
    return plainToInstance(ArticleDto, savedArticle, {
      excludeExtraneousValues: true,
    });
  }

  async deleteArticle(
    currentUser: UserBasicInfoDto,
    slug: string,
  ): Promise<string> {
    const user = await this.usersRepository.findOneBy({
      id: currentUser.userId,
      deletedAt: IsNull(),
    });
    if (!user) {
      throw new BadRequestException('Email or password wrong!!!');
    }
    const article = await this.acticlesRepository.findOne({
      where: { slug: slug, deletedAt: IsNull() },
      relations: ['tags'],
    });
    if (!article) {
      throw new BadRequestException('Article not found');
    }
    const deletedArticle = this.acticlesRepository.create({
      ...article,
      deletedAt: new Date(),
    });
    await this.acticlesRepository.save(deletedArticle);
    return 'Delete successfully';
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .concat('-', Date.now().toString());
  }
}
