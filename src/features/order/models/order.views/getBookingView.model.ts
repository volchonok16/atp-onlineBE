import { ApiProperty } from '@nestjs/swagger';
import { format } from 'date-fns';

export class GetBookingViewModel {
  // @ApiProperty({
  //   description: 'ID.',
  // })
  // RAZNAR2_KEY: number;
  //
  // @ApiProperty({
  //   example: '2023-07-10',
  //   description: 'Date of work.',
  // })
  // DATE_RAB: Date;

  @ApiProperty({
    description: 'Customer ID',
  })
  DATA_ID: number | null;

  @ApiProperty({
    description: 'Vehicle owner organization ID',
  })
  ORG_ID: number | null;

  @ApiProperty({
    description: 'Driver FIO ID',
  })
  FIO_ID: number | null;

  @ApiProperty({
    description: 'Second driver FIO ID',
  })
  FIO2_ID: number | null;

  @ApiProperty({
    description: 'Single application',
  })
  RAZOV: boolean;

  @ApiProperty({
    description: 'Attracted transport ID',
  })
  PRIVL_TRANSPORT: number | null;

  @ApiProperty({
    description: 'Route/flight ID',
  })
  ROUTE_ID: number | null;

  @ApiProperty({
    description: 'Сar types ID',
  })
  RAZN_T_T_ID: number | null;

  @ApiProperty({
    description: 'Сar ID',
  })
  RAZN_OD_ID: number | null;

  @ApiProperty({
    description: 'Vehicle submission time',
  })
  VR_V: string;

  @ApiProperty({
    description: 'Until which the vehicle will be rented',
  })
  VR_Z: string;

  @ApiProperty({
    description: 'Number of serving hours',
  })
  VR_I: string;

  @ApiProperty({
    description: 'The amount of hours',
  })
  SUMM_VREM: string;

  @ApiProperty({
    description: 'Tariff for the customer',
  })
  CENA: string;

  @ApiProperty({
    description: 'Total amount',
  })
  SUMM: string;

  @ApiProperty({
    description: "Contractor's tarif",
  })
  CENA_PODR: string;

  @ApiProperty({
    description: 'Number of hours for the contractor',
  })
  VREM_I_PODR: string;

  @ApiProperty({
    description: 'Amount for the customer',
  })
  SUMM_PODR: string;

  @ApiProperty({
    description: 'Estimated profit',
  })
  PROFIT_PODR: string;

  @ApiProperty()
  COMMENTAR: string;

  static toView(data) {
    return {
      DATA_ID: data.DATA_ID,
      ORG_ID: data.ORG_ID,
      FIO_ID: data.FIO_ID,
      FIO2_ID: data.FIO2_ID,
      RAZOV: !!data.RAZOV,
      PRIVL_TRANSPORT: data.PRIVL_TRANSPORT,
      ROUTE_ID: data.ROUTE_ID,
      RAZN_T_T_ID: data.RAZN_T_T_ID,
      RAZN_OD_ID: data.RAZN_OD_ID,
      VR_V: format(data.VR_V, 'yyyy-MM-dd'),
      VR_Z: format(data.VR_Z, 'yyyy-MM-dd'),
      //VR_V: timeStampToTimeTransformHelper(data.VR_V),
      // VR_Z: timeStampToTimeTransformHelper(data.VR_Z),
      VR_I: data.VR_I,
      SUMM_VREM: data.SUMM_VREM,
      CENA: data.CENA,
      SUMM: data.SUMM,
      CENA_PODR: data.CENA_PODR,
      VREM_I_PODR: data.VREM_I_PODR,
      SUMM_PODR: data.SUMM_PODR,
      PROFIT_PODR: data.PROFIT_PODR,
      COMMENTAR: data.COMMENTAR,
    };
  }
}
