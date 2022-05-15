import {MigrationInterface, QueryRunner} from "typeorm";

export class logs1652611432180 implements MigrationInterface {
    name = 'logs1652611432180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "candidate" ("id" SERIAL NOT NULL, "professional_title" text, "bio" text, "age" text, "current_salary" text NOT NULL, "expected_salary" text NOT NULL, "experience" text, "address" text NOT NULL, "postcode" text NOT NULL, "city" text NOT NULL, "country" text NOT NULL, "headline" text, "skills" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_77af458165fe750934e8425031" UNIQUE ("user_id"), CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education" ("id" SERIAL NOT NULL, "school_name" text NOT NULL, "school_location" text NOT NULL, "degree" text NOT NULL, "field_of_study" text, "description" text, "marks" text, "start_date" text NOT NULL, "end_date" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_5bfcef10ecdda36d2ee68aa204" UNIQUE ("user_id"), CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "company_name" text NOT NULL, "company_location" text NOT NULL, "designation" text NOT NULL, "description" text, "start_date" text NOT NULL, "end_date" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_62c0623650986849f3fc1d148e" UNIQUE ("user_id"), CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "middle_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_77af458165fe750934e8425031b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_5bfcef10ecdda36d2ee68aa2049" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_62c0623650986849f3fc1d148e7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_62c0623650986849f3fc1d148e7"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_5bfcef10ecdda36d2ee68aa2049"`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_77af458165fe750934e8425031b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "middle_name" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TABLE "candidate"`);
    }

}
