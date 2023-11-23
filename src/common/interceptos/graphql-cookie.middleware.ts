import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class GraphQLCookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Обработка куков для GraphQL
    // Установка куков через объект ответа res.cookie()
    // Например:
    res.cookie("myCookie", "cookieValue", {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 60 * 1000,
      sameSite: "none",
    });
    next();
  }
}
