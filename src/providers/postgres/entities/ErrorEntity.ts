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

  @Column({ nullable: true })
  errorMessage: string | null;

  @Column({ nullable: true })
  errorInfo: string | null;

  static create(
    method: string,
    path: string,
    request: string,
    errorMessage: string,
    errorInfo: string
  ) {
    const newError = new ErrorEntity();
    newError.createdAt = new Date().toISOString();
    newError.path = path;
    newError.method = method;
    newError.request = request;
    newError.errorMessage = errorMessage;
    newError.errorInfo = errorInfo;

    return newError;
  }
}
