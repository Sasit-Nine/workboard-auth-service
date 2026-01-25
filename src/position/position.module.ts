import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  providers: [PositionService],
})
export class PositionModule {}
