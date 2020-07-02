BEGIN;

ALTER TABLE "duration"
  DROP CONSTRAINT duration_review_id_fkey;

INSERT INTO "duration" ("departure_date", "return_date", "days_included", "days_number", "firstname", "lastname", "phone", "code", "review_id")
VALUES ('2020-06-27', '2020-07-02', '{"2020-06-28", "2020-06-29", "2020-06-30", "2020-07-01"}', 6,'Lorenzo', 'Hiver', '06000000', 'az2ZeR', 1),
       ('2020-07-05', '2020-07-08', '{"2020-07-06", "2020-07-07"}', 4, 'Dylan', 'Lagache', '06005005', 'Bz2Ae6', 2),
       ('2020-07-16', '2020-07-18', '{"2020-07-17"}', 3, 'Sylvia', 'Mazzolini', '06105085', 'ca3Ab9', 3);

INSERT INTO "review" ("firstname", "lastname", "picture", "comment", "rating", "duration_id")
VALUES ('Lorenzo', 'Hiver', 'aaa', 'ajhz ADZ Dkjh fbazf! 561651, 51az51 kazjdlka? zkja.', 4, 1),
       ('Dylan', 'Lagache', 'bbb', 'ajhz ADZ Dkjh fbazf! 561651, 51az51 kazjdlka? zkja.', 5, 2),
       ('Sylvia', 'Mazzolini', 'ccc', 'ajhz ADZ Dkjh fbazf! 561651, 51az51 kazjdlka? zkja.', 3, 3);

COMMIT;