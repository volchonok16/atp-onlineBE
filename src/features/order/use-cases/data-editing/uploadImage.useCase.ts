import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { format } from 'date-fns';
import { UploadImagesArrayDto } from '../../dto/dtos/uploadImagesArray.dto';
import { DataEditingRepository } from '../../repositories/dataEditing.repository';

export class UploadImagesCommand {
  constructor(public dto: UploadImagesArrayDto) {}
}

@CommandHandler(UploadImagesCommand)
export class UploadImagesUseCase
  implements ICommandHandler<UploadImagesCommand, boolean>
{
  constructor(public dataEditingRepository: DataEditingRepository) {}

  async execute({ dto }: UploadImagesCommand): Promise<boolean> {
    const date = format(new Date(), 'yyyy-MM-dd');

    return await this.dataEditingRepository.uploadImages(dto, date);
  }
}
