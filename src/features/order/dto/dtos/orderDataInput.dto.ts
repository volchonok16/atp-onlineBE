import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { MotorcadeNameEnum } from '../../types/motorcadeName.enum';
import { sortingMotorcadeName } from '../query.dtos/orderData.query.dto';

export class OrderDataInputDto {
  @ApiProperty({
    example: '2023-08-03',
    description: 'Date in the yyyy-MM-dd format or yyyy.MM.dd format',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ enum: MotorcadeNameEnum })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => sortingMotorcadeName(value))
  motorcadeName: number;
}
