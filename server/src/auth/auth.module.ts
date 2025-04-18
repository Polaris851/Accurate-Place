import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Client } from "src/module/client/entities/client.entity";
import { JwtModule } from "@nestjs/jwt";
import { config } from "dotenv";

config()

@Module({
    imports: [
        MikroOrmModule.forFeature([Client]),
        JwtModule.register({
            global: true,
            secret: process.env.ACCESS_TOKEN_SECRET,
            signOptions: {
                expiresIn: "1d"
            }
        })
    ],
    controllers: [AuthController],
    providers: []
})
export class AuthModule {}