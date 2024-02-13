-- migrate:up

ALTER TABLE "task" ADD COLUMN "category" jsonb ;

ALTER TABLE "task" ADD COLUMN "created_date" Date default CURRENT_DATE ;

ALTER TABLE "task" ADD column "assignToId" uuid NOT NULL ;

ALTER TABLE "task" ADD column "taskOwnerId" uuid NOT NULL ;

ALTER TABLE "task" ADD COLUMN "is_deleted" boolean default false ; 

-- migrate:down

ALTER TABLE "task" DROP COLUMN "category";

ALTER TABLE "task" DROP COLUMN "created_date" ;

ALTER TABLE "task" DROP COLUMN "assignToId"  ;

ALTER TABLE "task" DROP column "taskOwnerId" ;

ALTER TABLE "task" DROP COLUMN "is_deleted";




