import { ApiProperty } from "@nestjs/swagger";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";
import { IsNotEmpty, IsOptional } from "class-validator";

export class NoteDto {
  @ApiProperty({
    description: "Note ID",
    example: 5,
  })
  @IsNotEmpty()
  DATA_PRIM_KEY: number = null;

  @ApiProperty({
    description: "Organization ID",
    example: 1,
  })
  @IsNotEmpty()
  DATA_ID: number = null;

  @ApiProperty({
    description: "Note",
  })
  @IsOptional()
  PRIM: string = null;

  static dto(data: any): NoteDto {
    const noteDto = new NoteDto();
    return objectFieldFilter<NoteDto>(data, noteDto);
  }
}
