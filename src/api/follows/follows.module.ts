import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { FollowEntity } from './entities/follow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FollowEntity])],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}
