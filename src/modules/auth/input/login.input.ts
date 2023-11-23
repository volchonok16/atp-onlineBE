import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field({ defaultValue: "somemail@gmail.com" })
  email: string;

  @Field({ defaultValue: "qwerty" })
  password: string;
}
