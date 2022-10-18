import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolSchema } from './entities/school.entity';
import { SchoolsResolver } from './schools.resolver';
import { SchoolsService } from './schools.service';

// ${1 : PascalCase}
// ${2 : lowercase}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'School', schema: SchoolSchema }]),
  ],
  providers: [SchoolsResolver, SchoolsService],
})
export class SchoolsModule {}
