import { ApiProperty } from "@nestjs/swagger";
import { UploadImageDto } from "./uploadImages.dto";

export class UploadImagesArrayDto {
  @ApiProperty({ type: [UploadImageDto] })
  input: UploadImageDto[];
}
