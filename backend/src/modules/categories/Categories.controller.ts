import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './Categories.service';

@Controller('categories')
export class CategoriesController {
  categoryRepository: any;
  constructor(private readonly categoriesService: CategoriesService) {}

  /** List all locations in database with this endpoint */
  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  //get Location by
}
