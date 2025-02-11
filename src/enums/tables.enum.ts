export enum UserFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    FIRST_NAME = "firstName",
    LAST_NAME = "lastName",
    AVATAR = "avatar",
}

export enum BusinessFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    NAME = "name",
    SUBDOMAIN = "subdomain",
    LOCATION = "location",
    SLOGAN = "slogan",
    BRIEF = "brief",
    LOGO = "logo",
    TIER = "tier",
    STATUS = "status",
    THEME = "theme",
    WIFI_PASS = "wifiPass",
    PHONE_NUMBER = "phoneNumber",
    PUBLIC_PHONE = "publicPhone",
    INSTAGRAM = "instagram",
    FACEBOOK = "facebook",
    WHATSAPP = "whatsapp",
}

export enum ItemFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    NAME = "name",
    PRICE = "price",
    DESCRIPTION = "description",
    IMAGE = "image",
    QUANTITY = "quantity",
}

export enum CollectionFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    NAME = "name",
}

export enum TestimonialFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    CONTENT = "content",
    STATUS = "status",
}

export enum DiscountFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    PERCENT = "percent",
}

export enum CouponFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    CODE = "code",
    PERCENT = "percent",
    AMOUNT = "amount",
}

export enum ReviewFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    COMMENT = "comment",
    RATING = "rating",
    IMAGE = "image",
}

export enum OrderFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    STATUS = "status",
    TOTAL_PRICE = "totalPrice",
}

export enum OrderItemFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    QUANTITY = "quantity",
}

export enum CaramelFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    IDENTIFIER = "identifier",
    CONTENT = "content",
}

export enum AvailabilitySlotFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    DAY = "day",
    START_TIME = "startTime",
    END_TIME = "endTime",
}

export enum TeamMemberFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    NAME = "name",
    IMAGE = "image",
    BRIEF = "brief",
    ROLE = "role",
}

export enum RoleFields {
    ID = "id",
    NAME = "name",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum PermissionFields {
    ID = "id",
    DESCRIPTION = "description",
    ACTION = "action",
    TABLE = "table",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum UserFields {
    ID = "id",
    USERNAME = "username",
    EMAIL = "email",
    PHONE_NUMBER = "phoneNumber",
    ROLE = "role",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum TablesNames {
    USER = "user",
    BUSINESS = "business",
    ITEM = "item",
    COLLECTION = "collection",
    TESTIMONIAL = "testimonial",
    DISCOUNT = "discount",
    COUPON = "coupon",
    REVIEW = "review",
    ORDER = "order",
    ORDER_ITEM = "orderItem",
    CARAMEL = "caramel",
    AVAILABILITY_SLOT = "availabilitySlot",
    TEAM_MEMBER = "teamMember",
    USER = "user",
    ROLE = "role",
    PERMISSION = "permission",
    AWS = "aws",
    AUTH = "auth",
}

export type AllTablesColumns =
    | UserFields
    | BusinessFields
    | ItemFields
    | CollectionFields
    | TestimonialFields
    | DiscountFields
    | CouponFields
    | ReviewFields
    | OrderFields
    | OrderItemFields
    | CaramelFields
    | AvailabilitySlotFields
    | TeamMemberFields
    | RoleFields
    | PermissionFields
    | UserFields;
