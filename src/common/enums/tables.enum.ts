export enum ProductFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
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
    PRODUCT = "product",
    USER = "user",
    ROLE = "role",
    PERMISSION = "permission",
    AWS = "aws",
    AUTH = "auth",
}

export type AllTablesColumns =
    | ProductFields
    | RoleFields
    | PermissionFields
    | UserFields;
