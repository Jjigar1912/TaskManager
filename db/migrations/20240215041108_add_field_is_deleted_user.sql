-- migrate:up

ALTER TABLE "user" ADD COLUMN "is_deleted" BOOLEAN DEFAULT false ;

ALTER TABLE "user_role" ADD COLUMN "is_deleted" BOOLEAN DEFAULT false ; 

ALTER TABLE "teams" ADD COLUMN "is_deleted" BOOLEAN DEFAULT false ;

ALTER TABLE "team_user" ADD COLUMN "is_deleted" BOOLEAN DEFAULT false ;

-- migrate:down

ALTER TABLE "user" DROP COLUMN "is_deleted" ;

ALTER TABLE "user_role" DROP COLUMN "is_deleted" ; 

ALTER TABLE "teams" DROP COLUMN "is_deleted" ;


