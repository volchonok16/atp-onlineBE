import { PriceDto } from "../../dto/dtos/data-editing/price.dto";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PriceViewModel } from "../../models/dataEditing.views/priceViewModel";
import { DataEditingRepository } from "../../repositories/dataEditing.repository";
import { DataEditingQueryRepository } from "../../query.repositories/dataEditing.query.repository";
import { BadRequestException, NotFoundException } from "@nestjs/common";

export class CreateOrUpdatePriceCommand {
  constructor(public dto: PriceDto) {}
}

@CommandHandler(CreateOrUpdatePriceCommand)
export class CreateOrUpdatePriceUseCase
  implements ICommandHandler<CreateOrUpdatePriceCommand, PriceViewModel>
{
  constructor(
    private readonly dataEditingRepository: DataEditingRepository,
    private readonly dataEditingQueryRepository: DataEditingQueryRepository
  ) {}

  async execute({ dto }: CreateOrUpdatePriceCommand): Promise<PriceViewModel> {
    const isExists = await this.dataEditingQueryRepository.organizationExists(
      dto.DATA_ID
    );
    if (!isExists) throw new NotFoundException();

    // Checking the uniqueness of records in the database
    let isUnique = true;
    if (!dto.DATA_CENA_KEY) {
      const prices = await this.dataEditingQueryRepository.getPrices(
        dto.DATA_ID
      );
      for (const price of prices) {
        if (price.DATE_D === dto.DATE_D && price.VID_RAB === dto.VID_RAB) {
          isUnique = false;
        }
        if (!isUnique) {
          const message = `Couple of ields DATA_ID or VID_RAB must be unique.`;
          throw new BadRequestException(message);
        }
      }
    }

    return this.dataEditingRepository.createOrUpdatePrice(dto);
  }
}
