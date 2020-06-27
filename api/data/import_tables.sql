BEGIN;

-- Suppression des tables qui pourraient déjà exister
DROP TABLE IF EXISTS "duration", "review", "duration_has_review";

-- Création des tables

/* 1ère table : Duration */
CREATE TABLE "duration" (
  -- on utilise le nouveau type qui est un standard SQL alors que SERIAL est un pseudo-type de PG
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "departure_date" DATE NOT NULL DEFAULT CURRENT_DATE,
  "return_date" DATE NOT NULL,
  "days_number" INTEGER NOT NULL,
  "firstname" TEXT NOT NULL DEFAULT '',
  "lastname" TEXT NOT NULL DEFAULT '',
  "phone" VARCHAR(15),
  "code" CHAR(6),
  -- pour avoir la date et l'heure on utilise le type "timestamp", et pour être le plus précis possible on utilisera plutôt le type "timestampz" qui contient en plus de la date et de l'heure le fuseau horaire défini dans les locales du serveur
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

/* 2ème table : Card */
CREATE TABLE "review" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL DEFAULT '',
  "lastname" TEXT NOT NULL DEFAULT '',
  "picture" TEXT NOT NULL DEFAULT '',
  "comment" VARCHAR(300) NOT NULL DEFAULT '',
  "rating" INTEGER CHECK ("rating" > 0 AND "rating" < 6),
  "duration_id" INTEGER NOT NULL REFERENCES duration("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;