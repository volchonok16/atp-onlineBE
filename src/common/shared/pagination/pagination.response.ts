import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Type } from "@nestjs/common";

export interface IPaginated<T = unknown> {
  data: T[];
  total: number;
  pageNumber: number;
  pageCount: number;
}

export function Paginated<T = unknown>(classRef: Type<T>): Type<IPaginated<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginated<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field(() => Int)
    pageCount: number;

    @Field(() => Int)
    pageNumber: number;

    @Field(() => Int)
    total: number;
  }

  return PaginatedType as Type<IPaginated<T>>;
}
