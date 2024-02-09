-- migrate:up

ALTER TABLE "project" ADD CONSTRAINT unique_project_name UNIQUE("title"); 

ALTER TABLE "project" ADD COLUMN "actual_end_date" Date DEFAULT NULL ;

ALTER TABLE "project" ADD COLUMN "start_date" DATE NOT NULL ; 

-- migrate:down

ALTER TABLE "project" DROP CONSTRAINT unique_project_name ;


