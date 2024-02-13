-- migrate:up

ALTER TABLE "project" ADD COLUMN "expected_end_date" DATE NOT NULL ; 

ALTER TABLE "project" ADD COLUMN "actual_start_date" DATE DEFAULT NULL ; 

ALTER TABLE "project" ADD COLUMN "actual_end_date" DATE DEFAULT NULL ; 

ALTER TABLE "project" ADD COLUMN "admin_id" uuid NOT NULL ;

-- migrate:down

ALTER TABLE "project" DROP COLUMN "expected_end_date" ; 

ALTER TABLE "project" DROP COLUMN "actual_start_date" ; 

ALTER TABLE "project" DROP COLUMN "actual_end_date" ; 




