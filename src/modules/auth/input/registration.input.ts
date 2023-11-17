import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegistrationInput {
  @Field()
  email: string;
}
