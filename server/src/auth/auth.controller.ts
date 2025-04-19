import { EntityManager, EntityRepository } from "@mikro-orm/mysql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { BadRequestException, Body, ConflictException, Controller, ForbiddenException, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Client } from "src/module/client/entities/client.entity";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

import { AccessTokenPayload } from "./types";
import { AuthGuard, Request } from "./guards/auth.guard";
import { UpdateMeDto } from "./dto/update.dto";

@Controller()
export class AuthController {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: EntityRepository<Client>,
        private readonly jwtService: JwtService
    ) {}

    @Post("/login")
    public async login(@Body() dto: LoginDto) {
        const user = await this.clientRepository.findOne({ email: dto.email });

        if (user === null) {
            throw new BadRequestException("Usuário não existe")
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new ForbiddenException("Senha incorreta");
        }

        const payload: AccessTokenPayload = {
            userId: user.id
        }

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken
        };
    }

    @Post("/register")
    public async register(@Body() dto: RegisterDto) {
        const accountExists = (await this.clientRepository.findOne({ email: dto.email })) !== null;

        if (accountExists) {
            throw new ConflictException("Usuário já existe");
        }

        const password = await bcrypt.hash(dto.password, 10);

        const client = this.clientRepository.create({
            ...dto,
            password,
            is_admin: false
        });
        
        const response = await this.clientRepository.insert(client);

        if (!response) {
            throw new Error("Houve alguma falha ao inserir o usuário");
        }

        return {
            success: true,
            message: "Usuário criado com sucesso!"
        }
    }

    @Put("/update-me")
    @UseGuards(AuthGuard)
    public async update(@Body() dto: UpdateMeDto, @Req() request: Request) {
        const user = await this.clientRepository.findOne({ id: request.user.id });

        if (user === null) {
            throw new BadRequestException("Usuário não encontrado na base de dados");
        }

        if (!Boolean(dto.password)) {
            delete dto.password;
        }

        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        
        console.log(dto);
 
        await this.clientRepository.nativeUpdate(user, dto);
    }

    @Get("/me")
    @UseGuards(AuthGuard)
    public async me(@Req() request: Request) {
        return {
            user: request.user
        }
    }
}