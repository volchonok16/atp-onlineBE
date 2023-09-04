import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAdapter {
  constructor(private jwtService: JwtService) {}

  async createToken(userId: number): Promise<string> {
    const token = await this.jwtService.signAsync({
      userId,
    });
    return token;
  }
}
