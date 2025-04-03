import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthorFieldToArticlesTable1743522924922 implements MigrationInterface {
    name = 'AddAuthorFieldToArticlesTable1743522924922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "author_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_6515da4dff8db423ce4eb841490" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_6515da4dff8db423ce4eb841490"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "author_id"`);
    }

}
