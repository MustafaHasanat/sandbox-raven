type RelationsListing = {
    oneToOne: string[];
    oneToMany: string[];
    manyToOne: string[];
    manyToMany: string[];
};

type Tables<T> = {
    business: T;
    item: T;
    collection: T;
    testimonial: T;
    discount: T;
    coupon: T;
    review: T;
    order: T;
    orderItem: T;
    caramel: T;
    availabilitySlot: T;
    teamMember: T;
    role: T;
    permission: T;
    user: T;
};

const RELATIONS: Tables<RelationsListing> = {
    business: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    item: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    collection: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    testimonial: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    discount: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    coupon: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    review: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    order: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    orderItem: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    caramel: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    availabilitySlot: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    teamMember: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    role: {
        oneToOne: [],
        oneToMany: ["permissions"],
        manyToOne: [],
        manyToMany: [],
    },
    permission: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: ["role"],
        manyToMany: [],
    },
    user: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
};

export const RELATIONS_OBJECT: Tables<{
    ascendants: string[];
    descendants: string[];
}> = {
    // --- app relations ---
    business: {
        descendants: [
            ...RELATIONS.business.oneToMany,
            ...RELATIONS.business.manyToOne,
            ...RELATIONS.business.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.business.manyToOne,
            ...RELATIONS.business.manyToMany,
        ],
    },
    item: {
        descendants: [
            ...RELATIONS.item.oneToMany,
            ...RELATIONS.item.manyToOne,
            ...RELATIONS.item.manyToMany,
        ],
        ascendants: [...RELATIONS.item.manyToOne, ...RELATIONS.item.manyToMany],
    },
    collection: {
        descendants: [
            ...RELATIONS.collection.oneToMany,
            ...RELATIONS.collection.manyToOne,
            ...RELATIONS.collection.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.collection.manyToOne,
            ...RELATIONS.collection.manyToMany,
        ],
    },
    testimonial: {
        descendants: [
            ...RELATIONS.testimonial.oneToMany,
            ...RELATIONS.testimonial.manyToOne,
            ...RELATIONS.testimonial.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.testimonial.manyToOne,
            ...RELATIONS.testimonial.manyToMany,
        ],
    },
    discount: {
        descendants: [
            ...RELATIONS.discount.oneToMany,
            ...RELATIONS.discount.manyToOne,
            ...RELATIONS.discount.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.discount.manyToOne,
            ...RELATIONS.discount.manyToMany,
        ],
    },
    coupon: {
        descendants: [
            ...RELATIONS.coupon.oneToMany,
            ...RELATIONS.coupon.manyToOne,
            ...RELATIONS.coupon.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.coupon.manyToOne,
            ...RELATIONS.coupon.manyToMany,
        ],
    },
    review: {
        descendants: [
            ...RELATIONS.review.oneToMany,
            ...RELATIONS.review.manyToOne,
            ...RELATIONS.review.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.review.manyToOne,
            ...RELATIONS.review.manyToMany,
        ],
    },
    order: {
        descendants: [
            ...RELATIONS.order.oneToMany,
            ...RELATIONS.order.manyToOne,
            ...RELATIONS.order.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.order.manyToOne,
            ...RELATIONS.order.manyToMany,
        ],
    },
    orderItem: {
        descendants: [
            ...RELATIONS.orderItem.oneToMany,
            ...RELATIONS.orderItem.manyToOne,
            ...RELATIONS.orderItem.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.orderItem.manyToOne,
            ...RELATIONS.orderItem.manyToMany,
        ],
    },
    caramel: {
        descendants: [
            ...RELATIONS.caramel.oneToMany,
            ...RELATIONS.caramel.manyToOne,
            ...RELATIONS.caramel.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.caramel.manyToOne,
            ...RELATIONS.caramel.manyToMany,
        ],
    },
    availabilitySlot: {
        descendants: [
            ...RELATIONS.availabilitySlot.oneToMany,
            ...RELATIONS.availabilitySlot.manyToOne,
            ...RELATIONS.availabilitySlot.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.availabilitySlot.manyToOne,
            ...RELATIONS.availabilitySlot.manyToMany,
        ],
    },
    teamMember: {
        descendants: [
            ...RELATIONS.teamMember.oneToMany,
            ...RELATIONS.teamMember.manyToOne,
            ...RELATIONS.teamMember.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.teamMember.manyToOne,
            ...RELATIONS.teamMember.manyToMany,
        ],
    },
    // --- default relations ---
    role: {
        descendants: [
            ...RELATIONS.role.oneToMany,
            ...RELATIONS.role.manyToOne,
            ...RELATIONS.role.manyToMany,
        ],
        ascendants: [...RELATIONS.role.manyToOne, ...RELATIONS.role.manyToMany],
    },
    permission: {
        descendants: [
            ...RELATIONS.permission.oneToMany,
            ...RELATIONS.permission.manyToOne,
            ...RELATIONS.permission.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.permission.manyToOne,
            ...RELATIONS.permission.manyToMany,
        ],
    },
    user: {
        descendants: [
            ...RELATIONS.user.oneToMany,
            ...RELATIONS.user.manyToOne,
            ...RELATIONS.user.manyToMany,
        ],
        ascendants: [...RELATIONS.user.manyToOne, ...RELATIONS.user.manyToMany],
    },
};
