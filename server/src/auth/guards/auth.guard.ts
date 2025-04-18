import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccessTokenPayload } from "../types";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Client } from "src/module/client/entities/client.entity";
import { EntityRepository } from "@mikro-orm/mysql";
import { JwtService } from "@nestjs/jwt";
import { Request as DefaultRequest } from "express";

export type Request = DefaultRequest & {
    user: Client
}

export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: EntityRepository<Client>,
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const [_, accessToken] = request.headers.authorization?.split(" ") ?? [];

        if (!accessToken) {
            throw new ForbiddenException("Token inválido");
        }

        try {
            const payload: AccessTokenPayload = this.jwtService.verify(accessToken);

            const user = await this.clientRepository.findOne({ id: payload.userId });

            if (user === null) {
                throw new Error("Usuário não existe");
            }

            request.user = user;

            return true;
        } catch(_) {
            throw new ForbiddenException("Token inválido");
        }
    }
}