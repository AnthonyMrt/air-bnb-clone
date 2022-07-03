import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryTable1653992227084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO Category (name, description) VALUES ('hotel', 'Un hotel est un lieu génial');`,
    );
    queryRunner.query(
      `INSERT INTO Category (name, description) VALUES ('appartement', 'Vous vous sentirez comme chez vous');`,
    );
    queryRunner.query(
      `INSERT INTO Category (name, description) VALUES ('guesthouse', 'Rencontrez des habitants');`,
    );
    queryRunner.query(
      `INSERT INTO Category (name, description) VALUES ('villa', 'Si vous cherchez plus grand, vous ne trouverez pas');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DELETE FROM Category;');
  }
}
