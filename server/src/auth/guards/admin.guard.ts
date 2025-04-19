import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Request } from "./auth.guard";

export class AdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const user = request?.user;

        if (!user) {
            throw new ForbiddenException();
        }

        if (!user.is_admin) {
            throw new ForbiddenException();
        }

        return true;
    }
}