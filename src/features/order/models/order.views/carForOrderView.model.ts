import { ApiProperty } from '@nestjs/swagger';
import { OrderDataViewModel } from './orderDataView.model';

export class CarForOrderViewModel {
  @ApiProperty({ description: 'Сar model' })
  MAM: string;
  @ApiProperty({ description: 'Government number' })
  NOMER: string;
  @ApiProperty({ description: 'Departure time' })
  VR_V: Date;
  @ApiProperty({ description: 'Check-in time' })
  VR_Z: Date;
  @ApiProperty({ description: 'Driver FIO' })
  FIO: string;
  @ApiProperty({ description: 'Tech map' })
  KARTA: string;
  @ApiProperty()
  COMMENTAR: string;
  @ApiProperty({ description: 'Customer' })
  ZAKS: string;
  @ApiProperty({ description: 'Note' })
  PRIM: string;
  @ApiProperty({ description: 'Ticket expiration date' })
  END_DATE: Date;

  static toView(data: OrderDataViewModel) {
    return {
      MAM: data.MAM,
      NOMER: data.NOMER,
      VR_V: data.VR_V,
      VR_Z: data.VR_Z,
      FIO: data.FIO,
      KARTA: data.KARTA,
      COMMENTAR: data.COMMENTAR,
      ZAKS: data.ZAKS,
      PRIM: data.PRIM,
      END_DATE: data.END_DATE,
    };
  }
}
