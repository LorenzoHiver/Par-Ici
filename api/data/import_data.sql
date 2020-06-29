BEGIN;

INSERT INTO "duration" ("departure_date", "return_date", "days_included", "days_number", "firstname", "lastname", "phone", "code")
VALUES ('2020-06-27', '2020-06-30', '{"2020-06-28", "2020-06-29"}', 3,'Lorenzo', 'Hiver', '06000000', 'az2ZeR'),
       ('2020-07-01', '2020-07-08', '{"2020-07-02", "2020-07-03", "2020-07-04", "2020-07-05", "2020-07-06", "2020-07-07"}', 7, 'Dylan', 'Lagache', '06005005', 'Bz2Ae6'),
       ('2020-07-016', '2020-07-18', '{"2020-06-28"}', 2, 'Sylvia', 'Mazzolini', '06105085', 'ca3Ab9');

INSERT INTO "review" ("firstname", "lastname", "picture", "comment", "rating", "duration_id")
VALUES ('Lorenzo', 'Hiver', 'aaa', 'ajhz ADZ Dkjh fbazf! 561651, 51az51 kazjdlka? zkja.', 4, 1),
       ('Dylan', 'Lagache', 'bbb', 'ajhz ADZ Dkjh fbazf! 561651, 51az51 kazjdlka? zkja.', 5, 2),
       ('Sylvia', 'Mazzolini', 'ccc', 'ajhz ADZ Dkjh fbazf! 561651, 51az51 kazjdlka? zkja.', 3, 3);

COMMIT;
