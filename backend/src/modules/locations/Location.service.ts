import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/Category.entity';
import { updateLocationDto } from './Location.dto';
import { Location } from './Location.entity';
import { LocationI } from './Locations.interface';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getLocations(): Promise<Location[]> {
    const result = this.locationRepository.find({ relations: ['category'] });

    return result;
  }

  // find by id
  async getLocationById(id: number) {
    const location = await this.locationRepository.findOne(id);
    if (location) {
      return location;
    }
    throw new HttpException('Location non trouvé', HttpStatus.NOT_FOUND);
  }

  async createLocation(location: LocationI): Promise<LocationI> {
    const category = await this.categoryRepository.findOne({
      where: [{ name: location.category[1] }],
    });

    console.log(location);

    let newCat;

    if (!category) {
      newCat = await this.categoryRepository.save(
        this.categoryRepository.create({
          name: location.category[1],
          description: 'new description',
        }),
      );
      const categoryId = newCat.id;
      location.categoryId = categoryId;
    } else {
      location.category = category;
    }

    console.log(location);
    location.categoryId = category.id;
    delete location['category'];

    return await this.locationRepository.save(
      this.locationRepository.create(location),
    );
  }

  async updateLocation(id: number, input: updateLocationDto) {
    await this.locationRepository.update(id, input);
    const updateLocation = await this.locationRepository.findOne(id);
    if (updateLocation) {
      return updateLocation;
    }
    throw new HttpException('Location non trouvé', HttpStatus.NOT_FOUND);
  }

  async deleteLocation(id: number) {
    const deletedLocation = await this.locationRepository.delete(id);
    if (!deletedLocation.affected) {
      throw new HttpException('Location non trouvé', HttpStatus.NOT_FOUND);
    }
  }

  async searchLocation(title: string): Promise<Location[]> {
    const qb = this.locationRepository
      .createQueryBuilder('location')
      .where('LOWER(location.title) like :title', { title: '%' + title + '%' });

    const result = await qb.getMany();

    return result;
  }
}
