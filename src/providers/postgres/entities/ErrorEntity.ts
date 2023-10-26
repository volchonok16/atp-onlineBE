import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("errors")
export class ErrorEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  createdAt: string;

  @Column()
  path: string;

  @Column()
  request: string;

  @Column()
  method: string;

  static create(method, path, request) {
    const newError = new ErrorEntity();
    newError.createdAt = new Date().toISOString();
    newError.path = path;
    newError.method = method;
    newError.request = request;

    return newError;
  }
}
