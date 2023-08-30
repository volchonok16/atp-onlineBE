import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EmployeeEnum } from '../../types/employee.enum';

export class EmployeeQueryDto {
  @ApiProperty({ enum: EmployeeEnum })
  @IsEnum(EmployeeEnum)
  typeOfEmployee: string;
}
