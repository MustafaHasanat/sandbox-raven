import { BusinessesModule } from "./schemas/businesses/businesses.module";
import { ItemsModule } from "./schemas/items/items.module";
import { CollectionsModule } from "./schemas/collections/collections.module";
import { TestimonialsModule } from "./schemas/testimonials/testimonials.module";
import { DiscountsModule } from "./schemas/discounts/discounts.module";
import { CouponsModule } from "./schemas/coupons/coupons.module";
import { ReviewsModule } from "./schemas/reviews/reviews.module";
import { OrdersModule } from "./schemas/orders/orders.module";
import { OrderItemsModule } from "./schemas/orderItems/orderItems.module";
import { CaramelsModule } from "./schemas/caramels/caramels.module";
import { AvailabilitySlotsModule } from "./schemas/availabilitySlots/availabilitySlots.module";
import { TeamMembersModule } from "./schemas/teamMembers/teamMembers.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { S3Module } from "./schemas/aws/aws.module";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./schemas/users/users.module";
import { RolesModule } from "./schemas/roles/roles.module";
import { PermissionsModule } from "./schemas/permissions/permissions.module";
import { AuthModule } from "./schemas/auth/auth.module";
import { AuthGuard, PermissionGuard } from "./guards";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission, Role } from "./entities";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import entities from "./entities/entities";

@Module({
    imports: [
        // ===== configs =====
        // --- database ---
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DATABASE_HOST"),
                port: +configService.get<number>("DATABASE_PORT"),
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_DB"),
                entities: entities,
                synchronize: true,
            }),
            inject: [ConfigService],
        }),

        // ===== tables =====
        // --- base tables (never delete them) ---
        RolesModule,
        PermissionsModule,
        UsersModule,
        // --- app tables ---
        BusinessesModule,
        ItemsModule,
        CollectionsModule,
        TestimonialsModule,
        DiscountsModule,
        CouponsModule,
        ReviewsModule,
        OrdersModule,
        OrderItemsModule,
        CaramelsModule,
        AvailabilitySlotsModule,
        TeamMembersModule,
        // --- app repositories ---
        TypeOrmModule.forFeature([Role]),
        TypeOrmModule.forFeature([Permission]),
        // ===== services =====
        // --- mailer ---
        MailerModule.forRoot({
            transport: {
                service: process.env.MAILER_SERVICE_PROVIDER,
                auth: {
                    user: process.env.OFFICIAL_EMAIL,
                    pass: process.env.OFFICIAL_EMAIL_PASSWORD,
                },
            },
        }),

        // --- AWS-S3 ---
        S3Module,
        // --- jwt ---
        AuthModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1d" },
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard,
        },
        AppService,
    ],
    controllers: [AppController],
    exports: [AppService],
})
export class AppModule {}
