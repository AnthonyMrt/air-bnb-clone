import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LocationService } from './Location.service';

export interface CreateLocationDto {
  id: number;
  title: string;
  description: string;
  location: string;
  picture: string;
  stars: number;
  numberOfRooms: number;
  price: number;
  categoryId: number;
}

@Controller('locations')
export class LocationController {
  locationRepository: any;
  constructor(private readonly locationService: LocationService) {}

  /** List all locations in database with this endpoint */
  @Get()
  async getLocations() {
    return await this.locationService.getLocations();
  }

  //get Location by id
  @Get('/location/:id')
  async getLocationById(@Param('id') id: number) {
    return this.locationService.getLocationById(Number(id));
  }

  //get Location By Name
  @Get('/search/?')
  async getLocationByname(@Query('title') title: string) {
    console.log(title);
    return this.locationService.searchLocation(title);
  }

  //create location
  @Post('/create')
  async create(@Body() createLocationDto: CreateLocationDto) {
    const location = await this.locationService.createLocation(
      createLocationDto,
    );
    if (!location) {
      return "Erreur dans la création de l'article";
    }
    return location;
  }

  //update location
  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() body: any) {
    const newLocation: any = await this.locationService.updateLocation(
      id,
      body,
    );
    return newLocation;
  }

  //delete location
  @Delete('/delete/:id')
  async deleteLocation(@Param('id') id: number) {
    this.locationService.deleteLocation(Number(id));
    return `Location avec le id:  ${id} effacé`;
  }
}
