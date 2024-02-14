-- migrate:up

ALTER TABLE "comment" ADD column "id" uuid not null DEFAULT uuid_generate_v4() ;



-- migrate:down

ALTER TABLE "comment" DROP column "id" ;



