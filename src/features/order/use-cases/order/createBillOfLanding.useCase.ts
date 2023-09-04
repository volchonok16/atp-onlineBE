import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BillOfLadingCreateDto } from "../../dto/dtos/billOfLadingCreate.dto";
import { OrderRepository } from "../../repositories/order.repository";
import { BillOfLadingViewModel } from "../../models/order.views/billOfLadingViewModel";
import { generateTypeFromObject } from "../../../../common/helpers/generateTypeFromObject.helper";

export class CreateBillOfLadingCommand {
  constructor(public dto: BillOfLadingCreateDto) {}
}

@CommandHandler(CreateBillOfLadingCommand)
export class CreateBillOfLandingUseCase
  implements ICommandHandler<CreateBillOfLadingCommand>
{
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    dto,
  }: CreateBillOfLadingCommand): Promise<BillOfLadingViewModel> {
    const TTNData = {
      TTN_KEY: null,
      OTPRAVIT_ID: dto.OTPRAVIT_ID,
      POLUCHAT_ID: dto.POLUCHAT_ID,
      PLAT_ID: dto.PLAT_ID,
      RAZN_ZAK_ID: dto.RAZN_ZAK_ID,
      N_TTN: dto.N_TTN,
      DATE_SOST: dto.DATE_SOST,
      DATE_DOST: dto.DATE_DOST,
      P_POGR: dto.P_POGR,
      P_RAZGR: dto.P_RAZGR,
      OPASN_GRUZ: dto.OPASN_GRUZ,
      DOP_INFO: dto.DOP_INFO,
      OTPRAVIT_DATA_FIO_ID: dto.OTPRAVIT_DATA_FIO_ID,
      POLUCHAT_DATA_FIO_ID: dto.POLUCHAT_DATA_FIO_ID,
    };

    const TTN_EXTData = {
      TTN_EXT_KEY: null,
      TTN_ID: null,
      CODE: dto.CODE,
      NOM_PRICE: dto.NOM_PRICE,
      ARTICUL: dto.ARTICUL,
      KOL: dto.KOL,
      CENA: dto.CENA,
      NAIM: dto.NAIM,
      ED_IZM: dto.ED_IZM,
      UPAKOVKA: dto.UPAKOVKA,
      MEST: dto.MEST,
      MASSA: dto.MASSA,
    };

    const TTN_TRANSPData = {
      TTN_TRANSP_KEY: null,
      TTN_ID: null,
      NAIM: dto.NAIM_TTN_TRANSP,
      DOCS: dto.DOCS,
      VID_UPAK: dto.VID_UPAK,
      MEST: dto.MEST_TTN_TRANSP,
      SPOSOB: dto.SPOSOB,
      CODE: dto.CODE_TTN_TRANS,
      N_KONT: dto.N_KONT,
      KLASS: dto.KLASS,
      MASSA: dto.MASSA_TTN_TRANS,
      DOCS_LIST: dto.DOCS_LIST,
      P5_UKAZ: dto.P5_UKAZ,
      P6_FAKT_SOST_GRUZA_PRIEM: dto.P6_FAKT_SOST_GRUZA_PRIEM,
      P6_FAKT_SOST_GRUZA_SDACHA: dto.P6_FAKT_SOST_GRUZA_SDACHA,
      P8_USL_PEREV: dto.P8_USL_PEREV,
      P8_0: dto.P8_0,
      P8_1: dto.P8_1,
      P8_2: dto.P8_2,
      P8_3: dto.P8_3,
      P_13: dto.P_13,
      P_16: dto.P_16,
    };

    return await this.orderRepository.createBillOfLanding(
      TTNData,
      TTN_EXTData,
      TTN_TRANSPData
    );
  }
}
