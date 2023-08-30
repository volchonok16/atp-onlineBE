import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateAdditionalInformationDto {
  @IsString()
  @IsOptional()
  NAIM: string;
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
  @IsOptional()
  D_PREDUPR: number | null = null;
  @IsBoolean()
  @IsOptional()
  ARHIV = false;
}
