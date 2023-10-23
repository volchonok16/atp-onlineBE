import { Injectable, NotFoundException } from "@nestjs/common";
import { CarInfoDto } from "../dto/dtos/carInfo.dto";
import { UpdateStaffInfoDto } from "../dto/dtos/updateStaffInfo.dto";
import { UpdateInternshipDto } from "../dto/dtos/updateInternship.dto";
import { UpdateStaffCardDto } from "../dto/dtos/updateStaffCard.dto";
import { CreateRefuelingCardDto } from "../dto/dtos/createRefuelingCard.dto";
import { UpdateRefuelingCardDto } from "../dto/dtos/updateRefuelingCard.dto";
import { CreateAdditionalInformationDto } from "../dto/dtos/createAdditionalInformation.dto";
import { UpdateAdditionalInformationDto } from "../dto/dtos/updateAdditionalInformation.dto";
import { UpdateImageDto } from "../dto/dtos/updateImage.dto";
import { UploadImagesArrayDto } from "../dto/dtos/uploadImagesArray.dto";
import { getDataAccumulater } from "../../../common/helpers/getData.accumulater";
import { upsertQuery } from "../../../common/helpers/firebird-orm/upsert";
import { NoteDto } from "../dto/dtos/data-editing/note.dto";
import { NoteViewModel } from "../models/dataEditing.views/noteView.model";
import { PriceDto } from "../dto/dtos/data-editing/price.dto";
import { PriceViewModel } from "../models/dataEditing.views/priceViewModel";
import { OrganizationDto } from "../dto/dtos/data-editing/organizationDto";
import { OrganizationViewModel } from "../models/dataEditing.views/organizationView.model";
import { WithId } from "../../../common/types/withId.type";
import { SubunitDto } from "../dto/dtos/data-editing/subunit.dto";
import { SubunitViewModel } from "../models/dataEditing.views/subunitView.model";
import { FirebirdService } from "../../../common/helpers/firebird-orm/firebird";
import { createQuery } from "../../../common/helpers/firebird-orm/create";
import { booleanToNumber } from "../../../common/helpers/booleanToNumberTransform.helper";
import { CreateOtherEquipmentsAndObjectsForTableDocsDtoDto } from "../dto/dtos/data-editing/createOtherEquipmentsAndObjectsForTableDocs.dto";

@Injectable()
export class DataEditingRepository {
  constructor(private firebird: FirebirdService) {}

  async createOrUpdateOrganization(
    dto: OrganizationDto
  ): Promise<OrganizationViewModel> {
    const { query, parameters } = upsertQuery<
      OrganizationDto,
      OrganizationViewModel
    >("DATA", "DATA_KEY", dto, new OrganizationViewModel());
    const result = await this.firebird.query(query, parameters);

    return OrganizationViewModel.toView(result);
  }

  // deprecate
  async updateOrganization(dto: WithId<OrganizationDto>): Promise<number> {
    const data = getDataAccumulater(dto);

    const query = `
      UPDATE DATA
         SET ${data} 
       WHERE DATA_KEY = ?
    `;
    const result = await this.firebird.query(query, [dto.id]);

    return result["count"];
  }

  async deleteOrganization(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
          DELETE FROM DATA WHERE DATA_KEY = ?
        `,
        [id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async createOrUpdateSubunit(dto: SubunitDto): Promise<SubunitViewModel> {
    const { query, parameters } = upsertQuery<SubunitDto, SubunitViewModel>(
      "DATA_PODR",
      "DATA_PODR_KEY",
      dto,
      new SubunitViewModel()
    );
    const result = await this.firebird.query(query, parameters);

    return SubunitViewModel.toView(result);
  }

  // deprecate
  async updateSubunit(dto: WithId<SubunitDto>): Promise<number> {
    const data = getDataAccumulater(dto);

    const result = await this.firebird.query(
      `
      UPDATE DATA_PODR 
         SET ${data} 
       WHERE  DATA_PODR_KEY = ?;
    `,
      [dto.id]
    );

    return result["count"];
  }

  async deleteSubunit(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
          DELETE FROM DATA_PODR WHERE DATA_PODR_KEY = ?;
        `,
        [id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async createOrUpdateNote(dto: NoteDto): Promise<NoteViewModel> {
    const { query, parameters } = upsertQuery<NoteDto, NoteViewModel>(
      "DATA_PRIM",
      "DATA_PRIM_KEY",
      dto,
      new NoteViewModel()
    );
    const result = await this.firebird.query(query, parameters);

    return NoteViewModel.toView(result);
  }

  async deleteNote(id: number): Promise<boolean> {
    try {
      const result = await this.firebird.query(
        `
          DELETE FROM DATA_PRIM WHERE DATA_PRIM_KEY = ?;
    `,
        [id]
      );

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async createOrUpdatePrice(dto: PriceDto): Promise<PriceViewModel> {
    const { query, parameters } = upsertQuery<PriceDto, PriceViewModel>(
      "DATA_CENA",
      "DATA_CENA_KEY",
      dto,
      new PriceViewModel()
    );
    const result = await this.firebird.query(query, parameters);

    return PriceViewModel.toView(result);
  }

  async deletePrice(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
          DELETE FROM DATA_CENA WHERE DATA_CENA_KEY = ? 
        `,
        [id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteImage(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
        DELETE FROM FILES
        WHERE FILES_KEY = ?
    `,
        [id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async createCarInfo(dto: CarInfoDto) {
    const { query, parameters } = createQuery<CarInfoDto, string>(
      "OD",
      dto,
      "OD_KEY"
    );
    const resultId = await this.firebird.query(query, parameters);

    const [result] = await this.firebird.query(
      `
        SELECT * FROM OD WHERE OD_KEY = ?;
      `,
      [resultId.OD_KEY]
    );

    return result;
  }

  async updateCarInfo(dto: WithId<CarInfoDto>): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);

      await this.firebird.query<any>(
        `
      UPDATE OD 
         SET ${data}
       WHERE OD_KEY = ? 
    `,
        [dto.id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteCarInfo(OD_KEY: number) {
    try {
      await this.firebird.query(
        `
          DELETE FROM OD WHERE OD_KEY = ?
        `,
        [OD_KEY]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async updateStaffInfo(dto: WithId<UpdateStaffInfoDto>): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);

      const result = await this.firebird.query(
        `
        UPDATE FIO 
         SET ${data}
        WHERE FIO_KEY = ? 
    `,
        [dto.id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async updateInternship(dto: WithId<UpdateInternshipDto>): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);

      await this.firebird.query(
        `
    UPDATE FIO_STAGIROVKA
    SET ${data}
    WHERE FIO_ID = ?
    `,
        [dto.id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async updateStaffCard(dto: WithId<UpdateStaffCardDto>) {
    try {
      const data = getDataAccumulater(dto);

      await this.firebird.query(
        `
          UPDATE FIO_EXT SET ${data} WHERE FIO_ID = ? 
        `,
        [dto.id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async createRefuelCard(dto: WithId<CreateRefuelingCardDto>) {
    const responseForCreate = await this.firebird.query(`
    INSERT INTO FIO_ZAPR_CARDS (
    FIO_ID,
    N_ZAPR_CARD,
    ORG_NAME,
    LIMIT_,
    TOPL
    ) VALUES (
    ${dto.id},
    '${dto.N_ZAPR_CARD}',
    '${dto.ORG_NAME}',
    ${dto.LIMIT_},
    '${dto.TOPL}'
    ) RETURNING N_ZAPR_CARD, ORG_NAME, LIMIT_, TOPL;
    `);

    return responseForCreate;
  }

  async updateRefuelCard(
    dto: WithId<UpdateRefuelingCardDto>
  ): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);
      if (!data.length) return false;

      await this.firebird.query(
        `
          UPDATE FIO_ZAPR_CARDS SET ${data} WHERE FIO_ID = ?;
        `,
        [dto.id]
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async updateRefuelCardById(
    dto: WithId<UpdateRefuelingCardDto>
  ): Promise<boolean> {
    try {
      const data = getDataAccumulater(dto);

      await this.firebird.query(
        `
          UPDATE FIO_ZAPR_CARDS SET ${data} WHERE FIO_ID = ?;
        `,
        [dto.id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteRefuelCard(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
          DELETE FROM FIO_ZAPR_CARDS WHERE FIO_ZAPR_CARDS_KEY = ?
        `,
        [id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async createAdditionalInformationById(
    dto: WithId<CreateAdditionalInformationDto>
  ) {
    const responseForCreate = await this.firebird.query(`
    INSERT INTO FIO_DOCS (
    FIO_ID,
    NAIM,
    NOMER,
    KEM_VID,
    DATE_OT,
    DATE_DO,
    D_PREDUPR,
    ARHIV
    ) VALUES (
    ${dto.id},
    '${dto.NAIM}',
    '${dto.NOMER}',
    '${dto.KEM_VID}',
    '${dto.DATE_OT}',
    '${dto.DATE_DO}',
    ${dto.D_PREDUPR},
    ${booleanToNumber(dto.ARHIV)}
    ) RETURNING FIO_DOCS_KEY, FIO_ID, NAIM, NOMER, KEM_VID, DATE_OT, DATE_DO, D_PREDUPR, ARHIV
    `);
    if (!responseForCreate) {
      throw new NotFoundException("данные не сохранились");
    }

    return responseForCreate;
  }

  async updateAdditionalInformation(
    dto: WithId<UpdateAdditionalInformationDto>
  ) {
    try {
      const data = getDataAccumulater(dto, "number");

      await this.firebird.query(
        `
      UPDATE FIO_DOCS
         SET ${data}
       WHERE FIO_DOCS_KEY = ?;
    `,
        [dto.id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async DeleteAdditionalInformation(id: number): Promise<boolean> {
    try {
      await this.firebird.query(
        `
      DELETE FROM FIO_DOCS
       WHERE FIO_DOCS_KEY = ?;
    `,
        [id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async updateImage(dto: WithId<UpdateImageDto>) {
    try {
      const data = getDataAccumulater(dto);

      await this.firebird.query(
        `
      UPDATE FILES
         SET ${data}
       WHERE FILES_KEY = ?;
    `,
        [dto.id]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async uploadImages(
    dtoArr: UploadImagesArrayDto,
    date: string
  ): Promise<boolean> {
    let allSuccessful = true;

    for (const dto of dtoArr.input) {
      const result = await this.firebird.query(`
      INSERT INTO FILES (
        FILE_,
        TEXT,
        DATE_ADD,
        DATE_DO,
        USER_NAME,
        FILE_NAME
      ) VALUES (
        '${dto.FILE_}',
        '${dto.TEXT}',
        '${date}',
        '${dto.DATE_DO}',
        '${dto.USER_NAME}',
        '${dto.FILE_NAME}'
      )
    `);

      if (result.length <= 0) {
        allSuccessful = false;
      }
    }

    return allSuccessful;
  }

  async deleteFlight(id: number) {
    try {
      await this.firebird.query(
        `
          EXECUTE PROCEDURE RAZN_OD_DEL(?)
        `,
        [id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async createOrUpdateOtherEquipmentsAndObjects(
    dto: CreateOtherEquipmentsAndObjectsForTableDocsDtoDto
  ) {
    try {
      await this.firebird.query(
        `
      EXECUTE PROCEDURE RAZN_OD_DOCS_IU(?,?,?,?,?,?,?,?)
    `,
        [
          dto.RAZN_OD_DOCS_KEY,
          dto.MAS_SKLAD_OBJ_SPIS_KEY,
          dto.NAIM,
          dto.NOMER,
          dto.KEM_VID,
          dto.DATE_OT,
          dto.DATE_DO,
          dto.D_PREDUPR,
        ]
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteOldDocs(id: number) {
    try {
      await this.firebird.query(
        `
         EXECUTE PROCEDURE RAZN_OD_DOCS_DEL(?)
        `,
        [id]
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}
