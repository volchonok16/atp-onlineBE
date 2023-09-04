import { CreateNoteUseCase } from "./createNote.useCase";
import { CreateOrganizationUseCase } from "./createOrganization.useCase";
import { CreateOrUpdatePriceUseCase } from "./createOrUpdatePriceUseCase";
import { CreateSubunitUseCase } from "./createSubunit.useCase";
import { DeleteNoteUseCase } from "./deleteNote.useCase";
import { DeleteOrganizationUseCase } from "./deleteOrganization.useCase";
import { DeletePriceUseCase } from "./deletePrice.useCase";
import { DeleteSubunitUseCase } from "./deleteSubunit.useCase";
import { UpdateOrganizationUseCase } from "./updateOrganization.useCase";
import { UpdateSubunitUseCase } from "./updateSubunit.useCase";

export const dataEditingUseCases = [
  CreateNoteUseCase,
  CreateOrganizationUseCase,
  CreateOrUpdatePriceUseCase,
  CreateSubunitUseCase,
  DeleteNoteUseCase,
  DeleteOrganizationUseCase,
  DeletePriceUseCase,
  DeleteSubunitUseCase,
  UpdateOrganizationUseCase,
  UpdateSubunitUseCase,
];
