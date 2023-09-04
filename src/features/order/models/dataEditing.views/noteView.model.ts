import { ApiProperty } from "@nestjs/swagger";

export class NoteViewModel {
  @ApiProperty()
  DATA_PRIM_KEY: number = null;
  @ApiProperty()
  PRIM: string = null;

  static toView(data: Partial<NoteViewModel>): NoteViewModel {
    const result = new NoteViewModel();
    result.DATA_PRIM_KEY = data.DATA_PRIM_KEY;
    result.PRIM = data.PRIM;

    return result;
  }
}
