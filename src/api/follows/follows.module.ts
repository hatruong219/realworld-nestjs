import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { FollowEntity } from './entities/follow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowsRepository } from './repositories/follows.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FollowEntity])],
  controllers: [FollowsController],
  providers: [FollowsService, FollowsRepository],
  exports: [FollowsRepository],
})
export class FollowsModule {}
