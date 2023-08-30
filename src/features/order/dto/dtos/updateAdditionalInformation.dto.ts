import { objectFieldFilter } from '../../../../common/helpers/objectFieldFilter';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAdditionalInformationDto {
  @IsString()
  @IsOptional()
  NAIM: string = null;
  @IsString()
  @IsOptional()
  NOMER: string | null = null;
  @IsString()
  @IsOptional()
  KEM_VID: string | null = null;
  @IsString()
  @IsOptional()
  DATE_OT: string | null = '2023-08-14';
  @IsString()
  @IsOptional()
  DATE_DO: string | null = '2023-08-14';
  @IsString()
  @IsNumber()
  D_PREDUPR: number | null = null;
  @IsBoolean()
  @IsOptional()
  ARHIV = false;

  static dto(data: any) {
    const additionalInformationDto = new UpdateAdditionalInformationDto();
    return objectFieldFilter(data, additionalInformationDto);
  }
}
