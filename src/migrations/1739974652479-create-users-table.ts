import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1739974652479 implements MigrationInterface {
    name = 'CreateUserTable1739974652479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "user_name" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "image" character varying(255), "bio" character varying(255), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
