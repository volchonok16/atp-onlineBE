import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { booleanToNumber } from '../../../../../common/helpers/booleanToNumberTransform.helper';
import { IsValidTime } from '../../../../../common/decorators/isValidTime.decorator';

export class BookingDataDto {
  @ApiProperty({
    example: '2023-07-10',
    description: 'Date in the yyyy-MM-dd format or yyyy.MM.dd format',
  })
  @IsNotEmpty()
  @IsString()
  @Matches('^\\d{4}-\\d{2}-\\d{2}$')
  DATE_RAB: string;

  @ApiProperty({
    description: 'Customer ID',
  })
  @IsNumber()
  @IsOptional()
  DATA_ID: number = null;

  @ApiProperty({
    description: 'Vehicle owner organization ID',
  })
  @IsNumber()
  @IsOptional()
  ORG_ID: number = null;

  @ApiProperty({
    description: 'Driver FIO ID',
  })
  @IsNumber()
  @IsOptional()
  FIO_ID: number = null;

  @ApiProperty({
    description: 'Second driver FIO ID',
  })
  @IsNumber()
  @IsOptional()
  FIO2_ID: number = null;

  @ApiProperty({
    description: 'Single application',
    default: true,
  })
  @IsOptional()
  @Transform(({ value }) => booleanToNumber(value))
  RAZOV = 1;

  @ApiProperty({
    description: 'Attracted transport ID',
  })
  @IsNumber()
  @IsOptional()
  PRIVL_TRANSPORT: number = null;

  @ApiProperty({
    description: 'Route/flight ID',
  })
  @IsNumber()
  @IsOptional()
  ROUTE_ID: number = null;

  @ApiProperty({
    description: 'Сar types ID',
  })
  @IsNumber()
  @IsOptional()
  RAZN_T_T_ID: number = null;

  @ApiProperty({
    description: 'Сar ID',
  })
  @IsNumber()
  @IsOptional()
  RAZN_OD_ID: number = null;

  @ApiProperty({
    description: 'Vehicle submission time',
    example: '11:00',
  })
  @IsOptional()
  @IsValidTime()
  VR_V: string = null;

  @ApiProperty({
    description: 'Until which the vehicle will be rented',
    example: '11:00',
  })
  @IsOptional()
  @IsValidTime()
  VR_Z: string = null;

  @ApiProperty({
    description: 'Number of serving hours',
    example: '0.11',
  })
  @Matches('^\\d+(\\.\\d+)?$')
  @IsOptional()
  VR_I: string = null;

  @ApiProperty({
    description: 'The amount of hours',
    example: '0.11',
  })
  @Matches('^\\d+(\\.\\d+)?$')
  @IsOptional()
  SUMM_VREM: string = null;

  @ApiProperty({
    description: 'Tariff for the customer',
    example: '0.11',
  })
  @Matches('^\\d+(\\.\\d+)?$')
  @IsOptional()
  CENA: string = null;

  @ApiProperty({
    description: 'Total amount',
    example: '0.11',
  })
  @Matches('^\\d+(\\.\\d+)?$')
  @IsOptional()
  SUMM: string = null;

  @ApiProperty({
    description: "Contractor's tarif",
    example: '0.11',
  })
  @Matches('^\\d+(\\.\\d+)?$')
  @IsOptional()
  CENA_PODR: string = null;

  @ApiProperty({
    description: 'Number of hours for the contractor',
    example: '0.11',
  })
  @Matches('^\\d+(\\.\\d+)?$')
  @IsOptional()
  VREM_I_PODR: string = null;

  @ApiProperty({
    description: 'Amount for the customer',
    example: '0.11',
  })
  @Matches('^\\d+(\\.\\d+)?$')
  @IsOptional()
  SUMM_PODR: string = null;

  @ApiProperty({
    description: 'Estimated profit',
    example: '0.11',
  })
  @Matches('^\\d+(\\.\\d+)?$')
  @IsOptional()
  PROFIT_PODR: string = null;

  @ApiProperty()
  @IsOptional()
  COMMENTAR: string = null;
}
