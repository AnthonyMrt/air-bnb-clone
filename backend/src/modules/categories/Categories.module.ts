import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../categories/Category.entity';
import { CategoriesController } from './Categories.controller';
import { CategoriesService } from './Categories.service';

@Module({
  /** TypeOrmModule.forFeature([Location]) enables the location module to inject Typeorm Repositories for the Location entity */
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  /** Exporting this service lets you declare LocationService in the services of Modules where you would import the LocationModule
   * i.e. all you have to do to use the LocationService in other services is:
   * - declare `private readonly locationService: locationService` in the constructor of the service where you want to use it
   * - import the LocationModule in the corresponding module where you will need it
   */
  exports: [CategoriesService],
})
export class CategoriesModule {}
