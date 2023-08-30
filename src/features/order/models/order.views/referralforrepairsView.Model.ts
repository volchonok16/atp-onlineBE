import { ApiProperty } from '@nestjs/swagger';

export class ReferralForRepairsViewModel {
  @ApiProperty()
  NOM: number;
  @ApiProperty()
  FIO_ID: number;
  @ApiProperty()
  DATES: Date;
  @ApiProperty()
  RAZN_OD_ID: number | null;
  @ApiProperty()
  VID_RAB: string | null;
  @ApiProperty({ format: 'time' })
  VR_N: string | null;
  @ApiProperty({ format: 'time' })
  VR_K: string | null;

  constructor(dto) {
    this.NOM = dto.NOM;
    this.FIO_ID = dto.FIO_ID;
    this.DATES = dto.DATES;
    this.RAZN_OD_ID = dto.RAZN_OD_ID;
    this.VID_RAB = dto.VID_RAB;
    this.VR_N = dto.VR_N;
    this.VR_K = dto.VR_K;
  }
}
