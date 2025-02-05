import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    DeleteResult,
    FindManyOptions,
    Repository,
    UpdateResult,
} from "typeorm";
import {
    CustomResponseType,
    DeleteQueryProps,
    FullTokenPayload,
} from "src/types";
import { errorRes, newInstanceRes, updatedRes } from "src/responses";
import { CreateCouponDto } from "src/dto/coupons/create-coupon.dto";
import { UpdateCouponDto } from "src/dto/coupons/update-coupon.dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { Coupon } from "src/entities";

@Injectable()
export class CouponsService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>
    ) {}

    // --- Basic CRUD APIs ---

    async getCoupons(
        query: FindManyOptions
    ): Promise<CustomResponseType<Coupon[]>> {
        return await getAllHandler<Coupon>({
            query,
            repository: this.couponRepository,
            table: "Coupons",
        });
    }

    async getCouponById(id: string): Promise<CustomResponseType<Coupon>> {
        return await getByIdHandler<Coupon>({
            id,
            repository: this.couponRepository,
            table: "Coupon",
        });
    }

    async createCoupon(
        createCouponDto: CreateCouponDto
    ): Promise<CustomResponseType<Coupon>> {
        try {
            const response = await createHandler<Coupon>({
                dto: createCouponDto,
                repository: this.couponRepository,
            });

            return newInstanceRes<Coupon>(
                "Coupon has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateCoupon(
        id: string,
        updateCouponDto: UpdateCouponDto
    ): Promise<CustomResponseType<UpdateResult>> {
        try {
            const response = await updateHandler<Coupon>({
                id,
                dto: updateCouponDto,
                table: "Coupon",
                repository: this.couponRepository,
            });

            return updatedRes<UpdateResult>(
                "Coupon has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteCoupon(
        query: DeleteQueryProps,
        userTokenData: FullTokenPayload
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Coupon>({
            id,
            wipe,
            repository: this.couponRepository,
            table: "Coupon",
            userTokenData,
        });
    }
}
