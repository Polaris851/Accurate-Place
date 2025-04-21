import * as bcrypt from "bcryptjs";
import { Client } from "src/module/client/entities/client.entity";
import { LoginDto } from "./dto/login.dto";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AccessTokenPayload } from "./types";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    public async verifyPasswordAndGenerateToken(dto: LoginDto, user: Client) {
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new ForbiddenException("Senha incorreta");
        }

        const payload: AccessTokenPayload = {
            userId: user.id
        }

        const accessToken = this.jwtService.sign(payload);

        return accessToken;
    }
}