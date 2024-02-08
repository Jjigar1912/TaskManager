-- migrate:up

ALTER TABLE "teams" ADD CONSTRAINT unique_tl UNIQUE("tl_id") ; 

ALTER TABLE "team_user" ADD CONSTRAINT unique_tl_user UNIQUE("user_id","team_id");

ALTER TABLE "teams" ADD CONSTRAINT unique_team_name UNIQUE("name");


-- migrate:down

ALTER TABLE "teams" DROP CONSTRAINT unique_tl ;

ALTER TABLE "team_user" DROP CONSTRAINT unique_tl_user ;

ALTER TABLE "teams" DROP CONSTRAINT unique_team_name ;