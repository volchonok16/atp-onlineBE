import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { constants } from '../../../../common/constants/dataBaseField.constants';
import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';

export class PriceViewModel {
  @ApiProperty({ description: 'Price ID' })
  @IsNumber()
  @MaxLength(constants.idLength)
  DATA_CENA_KEY: number = null;

  @ApiProperty({ description: 'Organization ID' })
  @IsNumber()
  @MaxLength(constants.idLength)
  @IsNotEmpty()
  DATA_ID: number = null;

  @ApiProperty({ description: 'Type of work' })
  @IsString()
  @MaxLength(constants.organization.workType)
  @IsOptional()
  VID_RAB: string = null;

  @ApiProperty({ description: 'Effective date' })
  @IsString()
  @MaxLength(constants.organization.effectiveDate)
  @IsOptional()
  DATE_D: string = null;

  @ApiProperty({ description: 'Price per ton' })
  @IsNumber()
  @MaxLength(constants.organization.price)
  @IsOptional()
  CENA_TONN: number = null;

  @ApiProperty({ description: 'Price per route' })
  @IsNumber()
  @MaxLength(constants.organization.price)
  @IsOptional()
  CENA_ROUTE: number = null;

  @ApiProperty({ description: 'Price per hour' })
  @IsNumber()
  @MaxLength(constants.organization.price)
  @IsOptional()
  CENA_HOUR: number = null;

  static toView(data): PriceViewModel {
    const instance = new PriceViewModel();
    return objectFieldFilter<PriceViewModel>(data, instance);
  }
}
