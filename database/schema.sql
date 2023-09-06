-- public.users definition
-- Drop table
-- DROP TABLE users;
CREATE TABLE users (
  id uuid NOT NULL,
  email varchar NOT NULL,
  "password" varchar NOT NULL,
  "name" varchar NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL,
  CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE UNIQUE INDEX users_email_idx ON users (email);