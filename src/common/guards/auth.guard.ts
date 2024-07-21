/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    /**
     * Get the Bearer Token from the request's header if existed
     */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }

    /**
     * This will be run for every endpoint in the app to check the authentication
     * token in the request and fill the "user" key in the headers with the user data
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // get the token from the request
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        try {
            // prepare an object to be passed to the request under the name 'user', it will use
            // the token to check if the user is authenticated or not
            // if the token is undefined (a guest user), pass a nullable value
            const payload = token
                ? await this.jwtService.verifyAsync(token, {
                      secret: process.env.JWT_SECRET,
                  })
                : {};

            // pass the payload object to the request under the name 'user' so we can check for the
            // user's info anywhere in the app
            request["user"] = payload;

            // // get the user using its ID if the token exists, otherwise pass a nullable value
            // const user: { payload: User } = payload
            //     ? await this.usersService.getUserById(payload?.userId)
            //     : { payload: null };
        } catch (error) {
            throw new BadRequestException({
                message: "Unexpected error occurred",
                data: error.response,
                status: 500,
            });
        }

        return true;
    }
}
