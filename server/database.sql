--command 1
CREATE DATABASE medicine;

--command 2
CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

--command 3
CREATE TABLE todos(
  dose_id SERIAL,
  user_id UUID,
  medicine VARCHAR(255) NOT NULL,
  dosage INT NOT NULL,
  units VARCHAR NOT NULL,
  doses INT NOT NULL,
  frequency INT NOT NULL,
  PRIMARY KEY (dose_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--check to prevent empty strings in the units column
--command 4
ALTER TABLE todos ADD CONSTRAINT minimum_check CHECK (LENGTH(units) >= 1);