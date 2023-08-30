import { ApiProperty } from '@nestjs/swagger';
import { numberToBoolean } from '../../../../common/helpers/numberToBooleanTransform.helper';

export class FlightsViewModel {
  @ApiProperty()
  'PL_ROUTE_KEY': number;
  @ApiProperty()
  'ROUTE': string;
  @ApiProperty()
  'DEL': boolean;
  @ApiProperty()
  'COMMAND': number;
  @ApiProperty()
  'DESCR': string;
  @ApiProperty()
  'ST_ZARPL': number;
  @ApiProperty()
  'INERTN': number;
  @ApiProperty()
  'CENA': number;
  @ApiProperty()
  'C_TONN': number;
  @ApiProperty()
  'C_TONN_KM': number;
  @ApiProperty()
  'C_SUTKI': number;
  @ApiProperty()
  'C_HOUR': number;
  @ApiProperty()
  'C_KM': number;
  @ApiProperty()
  'V_TOPL': number;
  @ApiProperty()
  'VREM': number;
  @ApiProperty()
  'RASPISAN': string;
  @ApiProperty()
  'DATE_D': Date;
  @ApiProperty()
  'REQUIRED_DATE': Date;
  @ApiProperty()
  'DATA_ID': number;

  static toView(data) {
    const result = { ...data };
    result.DEL = numberToBoolean(data.DEL);

    return result;
  }
}
