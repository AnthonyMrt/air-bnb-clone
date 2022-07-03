// import { Type } from 'class-transformer';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Max, Min } from 'class-validator';

/**
 * This dto is used to control user inputs and make sure it is valid data to create locations.
 * If the input provided to the endpoint does not match the rules defined by decorators here,
 * the endpoint will immediately return an error.
 * More info here: https://docs.nestjs.com/techniques/validation
 */

/**
 * TODO implement
 */
// export class ExampleLocationDto {
//   @IsString()
//   xxx: string;

//   @IsDate()
//   @Type(() => Date)
//   yyyy: Date;

//   @IsNumber()
//   zzzz: number;
// }

@InputType()
export class LocationCreateInput {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => String)
  @IsString()
  location: string;

  @Field(() => String)
  @IsString()
  picture: string;

  @Field(() => Number)
  @IsNumber()
  stars: number;

  @Field(() => Number)
  @IsNumber()
  numberOfRooms: number;

  @Field(() => Number)
  @IsNumber()
  price: number;

  @Field(() => Number)
  @IsNumber()
  categoryId: number;
}

@ObjectType()
export class LocationCreateOutput {
  @Field(() => Location)
  location: Location;
}

export class updateLocationDto {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => String)
  @IsString()
  location: string;

  @Field(() => String)
  @IsString()
  picture: string;

  @Field(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  stars: number;

  @Field(() => Number)
  @IsNumber()
  numberOfRooms: number;

  @Field(() => Number)
  @IsNumber()
  price: number;

  @Field(() => Number)
  @IsNumber()
  categoryId: number;
}
