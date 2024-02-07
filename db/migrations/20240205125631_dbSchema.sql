-- migrate:up

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  

CREATE TYPE Status AS ENUM('Pending','In Progress','Completed','Hold') ; 

CREATE TYPE Priority AS ENUM('High','Medium','Low'); 

CREATE TYPE Task_Status AS ENUM('Todo','In Progress','Testing','Done','Reopen','Hold');

CREATE TYPE ACTION AS ENUM('CREATE','UPDATE','DELETE');

CREATE TABLE IF NOT EXISTS "user" 
(
    "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 () , 
    "userName" VARCHAR(50) NOT NULL , 
    "email" VARCHAR(70) NOT NULL UNIQUE, 
    "contact" VARCHAR(10) NOT NULL , 
    "password" VARCHAR NOT NULL , 
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);

CREATE TABLE IF NOT EXISTS "userRole"
(
    "id" SERIAL NOT NULL PRIMARY KEY , 
    "name" VARCHAR NOT NULL , 
    "code" VARCHAR NOT NULL UNIQUE 
);

CREATE TABLE IF NOT EXISTS "user_role"
(
    "id" SERIAL NOT NULL PRIMARY KEY , 
    "user_id" uuid  NOT NULL REFERENCES "user"(id) , 
    "role_id" INTEGER NOT NULL REFERENCES "userRole"(id)
);

CREATE TABLE IF NOT EXISTS "teams"
(
    "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), 
    "name" VARCHAR NOT NULL , 
    "tl_id" uuid NOT NULL REFERENCES "user"(id) , 
    "created_by" uuid NOT NULL REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS "team_user"
(
    "id" BIGSERIAL NOT NULL PRIMARY KEY , 
    "user_id" uuid NOT NULL REFERENCES "user"(id) , 
    "team_id" uuid NOT NULL REFERENCES "teams"(id) 
);

CREATE TABLE IF NOT EXISTS "project"
(
    "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4() ,
    "title" VARCHAR NOT NULL , 
    "description" TEXT NOT NULL , 
    "project_code" VARCHAR NOT NULL , 
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP , 
    "is_deleted" boolean DEFAULT false , 
    "status" Status NOT NULL , 
    "end_date" TIMESTAMP NOT NULL , 
    "team_id" uuid NOT NULL REFERENCES "teams"(id)
);

CREATE TABLE IF NOT EXISTS "task"
(
    "id" uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4() , 
    "title" VARCHAR NOT NULL , 
    "description" TEXT NOT NULL , 
    "priority" Priority NOT NULL , 
    "task_status" Task_Status NOT NULL ,
    "assigned_at" DATE NOT NULL , 
    "due_date" DATE NOT NULL , 
    "completed_date" DATE NOT NULL DEFAULT NULL , 
    "project_id" uuid NOT NULL REFERENCES "project"(id) , 
    "assignToId" INTEGER NOT NULL REFERENCES "user_role"(id) , 
    "taskOwnerId" INTEGER NOT NULL REFERENCES "user_role"(id) 
);

CREATE TABLE IF NOT EXISTS "category"
(
    "id" SERIAL NOT NULL PRIMARY KEY , 
    "name" VARCHAR NOT NULL 
);

CREATE TABLE IF NOT EXISTS "TaskActivityLog"
(
    "id" BIGSERIAL NOT NULL PRIMARY KEY , 
    "task_id" uuid NOT NULL REFERENCES "task"(id) , 
    "user_id" uuid NOT NULL REFERENCES "user"(id) , 
    "column" VARCHAR NOT NULL , 
    "value" VARCHAR NOT NULL , 
    "type" ACTION NOT NULL , 
    "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS "comment"
(
    "id" SERIAL NOT NULL PRIMARY KEY , 
    "message" TEXT NOT NULL , 
    "task_id" uuid NOT NULL REFERENCES "task"(id) , 
    "user_id" uuid NOT NULL REFERENCES "user"(id) , 
    "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO "userRole"(name,code) VALUES('ADMIN','role_admin') on CONFLICT(code) DO NOTHING ;

INSERT INTO "userRole"(name,code) VALUES('DEVELOPER','role_developer') on CONFLICT(code) DO NOTHING ;

INSERT INTO "userRole"(name,code) VALUES('TL','role_tl') on CONFLICT(code) DO NOTHING ;


INSERT INTO "user"("userName","email","contact","password") VALUES('Jigar','khalasjigar0861@gmail.com','8980168340','Jig@r1234') ON CONFLICT(email) DO NOTHING ;

INSERT INTO "user"("userName","email","contact","password") VALUES('Tirth Jain','tirth@gmail.com','8980168341','Jig@r1234') ON CONFLICT(email) DO NOTHING ;

INSERT INTO "user"("userName","email","contact","password") VALUES('Mayur Jadeja','mayur@gmail.com','8980168440','Jig@r1234') ON CONFLICT(email) DO NOTHING ;

-- migrate:down

DROP TABLE IF EXISTS "comment";

DROP TABLE IF EXISTS "TaskActivityLog";

DROP TABLE IF EXISTS "task"; 

DROP TABLE IF EXISTS "project" ; 

DROP TABLE IF EXISTS "team_user";

DROP TABLE IF EXISTS "teams";

DROP TABLE IF EXISTS "user_role" ;

DROP TABLE IF EXISTS "user" ;

DROP TABLE IF EXISTS  "userRole" ;

DROP TABLE IF EXISTS "category";

DROP TYPE IF EXISTS Status ; 

DROP TYPE IF EXISTS Priority ; 

DROP TYPE IF EXISTS ACTION ; 

DROP TYPE IF EXISTS Task_Status;
