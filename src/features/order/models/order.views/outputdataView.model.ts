import { ApiProperty } from '@nestjs/swagger';

export class OutputDataViewModel {
  @ApiProperty()
  RAZN_ID: number;
  @ApiProperty()
  N_TTN: string;
  @ApiProperty()
  usersWayBillNumber?: string | null;

  constructor(dto) {
    this.RAZN_ID = dto.RAZN_ID;
    this.N_TTN = dto.N_TTN;
    this.usersWayBillNumber = dto.usersWayBillNumber;
  }
}
