import { Module } from '@nestjs/common';
import { GrpcTestService } from './test.service';
import { GrpcTestController } from './test.controller';

@Module({
  imports: [],
  controllers: [GrpcTestController],
  providers: [GrpcTestService],
})
export class TestModule {}
