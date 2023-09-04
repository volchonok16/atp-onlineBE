import { ApiProperty } from "@nestjs/swagger";
import { Archive } from "../../types/archive.enum";
import { shortStringToBoolean } from "../../../../common/helpers/shortStringToBooleanTransform.helper";

export class CarsInfoViewModel {
  @ApiProperty()
  OD_KEY: number;

  @ApiProperty()
  M_AM: string;

  @ApiProperty()
  NAVTO: string;

  @ApiProperty()
  RCH: number | null;

  @ApiProperty()
  RCH_Z: number | null;

  @ApiProperty()
  NRT_L: number;

  @ApiProperty()
  NRT_Z: number;

  @ApiProperty()
  NRT_GRUZ_L: number | null;

  @ApiProperty()
  NRT_GRUZ_Z: number | null;

  @ApiProperty()
  RPROG_Z: number | null;

  @ApiProperty()
  RPROG_L: number | null;

  @ApiProperty()
  TOPL: string;

  @ApiProperty()
  LM_AM: string;

  @ApiProperty()
  ARHIV: boolean;

  @ApiProperty()
  RAZN_OD_ID: number;

  @ApiProperty()
  FROM_1C_ID: string | null;

  @ApiProperty()
  NRT_PODJOM: number | null;

  @ApiProperty()
  NRT_L_MG: number | null;

  @ApiProperty()
  NRT_Z_MG: number | null;

  @ApiProperty()
  NRT_CH_OSN_DVIG_L: number | null;

  @ApiProperty()
  NRT_CH_OSN_DVIG_Z: number | null;

  @ApiProperty()
  DATA_ID: number | null;

  @ApiProperty()
  MAM_NOM: string;

  constructor(dto) {
    this.OD_KEY = dto.OD_KEY;
    this.M_AM = dto.M_AM;
    this.NAVTO = dto.NAVTO;
    this.LM_AM = dto.LM_AM;
    this.RCH = dto.RCH;
    this.RCH_Z = dto.RCH_Z;
    this.NRT_L = dto.NRT_L;
    this.NRT_Z = dto.NRT_Z;
    this.NRT_GRUZ_L = dto.NRT_GRUZ_L;
    this.NRT_GRUZ_Z = dto.NRT_GRUZ_Z;
    this.RPROG_Z = dto.RPROG_Z;
    this.RPROG_L = dto.RPROG_L;
    this.TOPL = dto.TOPL;
    this.ARHIV = shortStringToBoolean(dto.ARHIV);
    this.RAZN_OD_ID = dto.RAZN_OD_ID;
    this.FROM_1C_ID = dto.FROM_1C_ID;
    this.NRT_PODJOM = dto.NRT_PODJOM;
    this.NRT_L_MG = dto.NRT_L_MG;
    this.NRT_Z_MG = dto.NRT_Z_MG;
    this.NRT_CH_OSN_DVIG_L = dto.NRT_CH_OSN_DVIG_L;
    this.NRT_CH_OSN_DVIG_Z = dto.NRT_CH_OSN_DVIG_Z;
    this.DATA_ID = dto.DATA_ID;
    this.MAM_NOM = dto.MAM_NOM;
  }
}
