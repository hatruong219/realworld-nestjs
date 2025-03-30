import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldDeletedAt1743340609978 implements MigrationInterface {
  name = 'AddFieldDeletedAt1743340609978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "follows" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "tags" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "follows" DROP COLUMN "deleted_at"`);
  }
}
