import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class BillOfLandingDeleteDto {
  @ApiProperty()
  @IsNumber()
  @Max(99999999)
  @IsNotEmpty()
  TTN_ID: number;
}
