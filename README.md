# PERN Application

A full-stack application (PostgreSQL, Express, React, Node) that allows users to create, read, update, and delete their medicinal doses.


## Installation
Dependencies related to React JS, Node.js, and Express.js would need to be installed.

Install [PostgreSQL](https://www.postgresql.org/download/) and open carteblanche/server/**db.js**

1. On line 6, change the **password** to the password you use to access your PostgreSQL database.
2. On line 8, change the name of the **database** to any existing database in your PostgreSQL or create a new one titled 'medicine'.
3. Confirm whether your user in PostgreSQL is 'postgres', as is usually the case. Otherwise, edit line 5 as well.

Open the command prompt and start PostgreSQL with this command

```bash
psql -U postgresql
```
Next, open carteblanche/server/**database.sql** and copy the 4 SQL commands provided there, one by one, on to your command prompt. In case, command 2 results in an error due to _uuid_generate_v4()_, the following command will resolve it.

```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Now, open a new terminal window, navigate to carteblanche/**server**, and run
```bash
nodemon server
```
The server side is up and running now.

For the client side, open another terminal window, navigate to carteblache/**client** and use
```bash
npm start
```
to get the client side working too. It will take a few moments for the React application to begin on localhost:3000

For any queries during configuration, contact me at nayyaranaseer7@gmail.com
