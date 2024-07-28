import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CustomResponseType } from "../../common/types";
import {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    CreateBucketCommandOutput,
    PutObjectCommandOutput,
    DeleteObjectCommandOutput,
    DeleteObjectsCommand,
    GetObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { join } from "path";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;
    private bucketName: string | null = null;

    // configuration
    constructor(private readonly configService: ConfigService) {
        try {
            this.bucketName = this.configService.get("S3_BUCKET_NAME");
            const s3Client = new S3Client({
                credentials: {
                    accessKeyId: this.configService.get("AWS_ACCESS_KEY"),
                    secretAccessKey: this.configService.get(
                        "AWS_SECRET_ACCESS_KEY"
                    ),
                },
                region: this.configService.get("AWS_REGION"),
            });

            this.s3Client = s3Client;
        } catch (error) {
            console.error("Error connecting the AWS client:", error);
        }
    }

    // --- creating a bucket ---
    async createBucket({
        bucketName,
    }: {
        bucketName: string;
    }): Promise<CustomResponseType<CreateBucketCommandOutput>> {
        try {
            const response = await this.s3Client.send(
                new CreateBucketCommand({
                    Bucket: bucketName,
                })
            );

            return {
                message: "Bucket has been created successfully!",
                payload: response,
                status: 201,
                extra: {
                    bucketName,
                },
            };
        } catch (error) {
            return { message: "Error occurred", payload: error, status: 500 };
        }
    }

    // --- fetching ---

    async getImage({
        imageName,
        imagePath,
        bucketName,
    }: {
        imagePath: string;
        imageName: string;
        bucketName?: string;
    }): Promise<CustomResponseType<string>> {
        try {
            const response = await this.s3Client.send(
                new GetObjectCommand({
                    Bucket: bucketName || this.bucketName,
                    Key: join(imagePath, imageName),
                })
            );

            const stringResponse = await response.Body.transformToString();

            return {
                message: "Image has been retrieved successfully!",
                payload: stringResponse,
                status: 200,
            };
        } catch (error) {
            return { message: "Error occurred", payload: error, status: 500 };
        }
    }

    async getImageURL({
        imageName,
        imagePath,
        bucketName,
    }: {
        imagePath: string;
        imageName: string;
        bucketName?: string;
    }): Promise<CustomResponseType<string>> {
        try {
            const bucket = bucketName || this.bucketName;
            const key = join(imagePath, imageName);

            const publicUrl = `https://${bucket}.s3.amazonaws.com/${key}`;

            const presignedUrl = await getSignedUrl(
                this.s3Client,
                new GetObjectCommand({
                    Bucket: bucket,
                    Key: key,
                    ResponseContentType: "image/png",
                }),
                {
                    expiresIn: 3600, // 3600 seconds = 1 hour
                }
            );

            return {
                message: `Image has been retrieved successfully, expires in 1 hour`,
                payload: presignedUrl,
                status: 200,
                extra: {
                    publicUrl,
                },
            };
        } catch (error) {
            return {
                message: "Error occurred",
                payload: error?.message,
                status: 500,
            };
        }
    }

    async getAllImages({
        imagesPath,
        bucketName = this.bucketName,
    }: {
        imagesPath: string;
        bucketName?: string;
    }): Promise<CustomResponseType<GetObjectCommandOutput>> {
        try {
            const response = await this.s3Client.send(
                new GetObjectCommand({
                    Bucket: bucketName,
                    Key: imagesPath,
                })
            );

            return {
                message: "Images has been retrieved successfully!",
                payload: response,
                status: 200,
            };
        } catch (error) {
            return { message: "Error occurred", payload: error, status: 500 };
        }
    }

    // --- uploading images ---

    async uploadImage({
        file,
        filePath,
        fileName,
        bucketName,
    }: {
        file: Express.Multer.File;
        filePath: string;
        fileName?: string;
        bucketName?: string;
    }): Promise<CustomResponseType<PutObjectCommandOutput>> {
        try {
            const response = await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: bucketName || this.bucketName,
                    Key: join(filePath, fileName || file.originalname),
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    ACL: "bucket-owner-full-control",
                })
            );

            return {
                message: "Image has been uploaded successfully!",
                payload: response,
                status: 201,
            };
        } catch (error) {
            return { message: "Error occurred", payload: error, status: 500 };
        }
    }

    async bulkUploadImages({
        files,
        bucketName = this.bucketName,
    }: {
        files: {
            file: Express.Multer.File;
            filePath: string;
            fileName?: string;
        }[];
        bucketName?: string;
    }): Promise<
        CustomResponseType<{ images: { path: string; imageName: string }[] }>
    > {
        try {
            await Promise.all(
                files.map(({ file, filePath, fileName }) => {
                    this.uploadImage({
                        file,
                        filePath,
                        fileName: fileName || file?.originalname,
                        bucketName,
                    });
                })
            );

            return {
                message: "Images have been uploaded successfully!",
                payload: {
                    images: files.map(({ file, fileName, filePath }) => ({
                        imageName: file.originalname,
                        path: join(filePath, fileName || file.originalname),
                    })),
                },
                status: 201,
            };
        } catch (error) {
            return { message: "Error occurred", payload: error, status: 500 };
        }
    }

    // --- deletion ---

    async deleteFile({
        filePath,
        fileName,
        bucketName,
    }: {
        filePath: string;
        fileName: string;
        bucketName?: string;
    }): Promise<CustomResponseType<DeleteObjectCommandOutput>> {
        try {
            const response = await this.s3Client.send(
                new DeleteObjectCommand({
                    Bucket: bucketName || this.bucketName,
                    Key: join(filePath, fileName),
                    ExpectedBucketOwner:
                        this.configService.get("AWS_ACCOUNT_ID"),
                })
            );

            return {
                message: "Image has been deleted successfully!",
                payload: response,
                status: 200,
            };
        } catch (error) {
            console.log(error);

            return {
                message: "Error occurred",
                payload: error?.message,
                status: 500,
            };
        }
    }

    async bulkDeleteFiles({
        files,
        bucketName = this.bucketName,
    }: {
        files: {
            filePath: string;
            fileName: string;
        }[];
        bucketName?: string;
    }): Promise<CustomResponseType<DeleteObjectCommandOutput>> {
        try {
            const response = await this.s3Client.send(
                new DeleteObjectsCommand({
                    Bucket: bucketName,
                    Delete: {
                        Objects: files.map((item) => ({
                            Key: join(item?.filePath, item?.fileName),
                        })),
                    },
                })
            );

            return {
                message: "Image has been deleted successfully!",
                payload: response,
                status: 200,
            };
        } catch (error) {
            return { message: "Error occurred", payload: error, status: 500 };
        }
    }
}
