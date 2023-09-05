import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches } from "class-validator";
import { BookingDataDto } from "./bookingData.dto";
import { objectFieldFilter } from "../../../../../common/helpers/objectFieldFilter";
import { format, parseISO } from "date-fns";

export class UpdateBookingDataDto extends BookingDataDto {
  @ApiProperty({
    example: "2023-07-10",
    description: "Date in the yyyy-MM-dd format or yyyy.MM.dd format",
  })
  @IsOptional()
  @IsString()
  @Matches("^\\d{4}-\\d{2}-\\d{2}$")
  DATE_RAB: string = null;

  static dto(data: any): UpdateBookingDataDto {
    const updateBookingDataDto = new UpdateBookingDataDto();
    const result = objectFieldFilter<UpdateBookingDataDto>(
      data,
      updateBookingDataDto
    );
    result.VR_V = format(parseISO(data.VR_V), "HH:mm");
    result.VR_Z = format(parseISO(data.VR_Z), "HH:mm");
    return result;
  }
}
