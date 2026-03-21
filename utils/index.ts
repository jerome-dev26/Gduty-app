import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

// 1. Take the plain text password from your Admin panel
const plainPassword = "YourSecureStationPassword";

// 2. "Salt" and Hash it (The Shredding)
const hash = await bcrypt.hash(plainPassword);

// 3. Store the 'hash' in the 'stations' table, NOT the plain text.
// Now, if someone sees your database, they only see: $2b$12$f034...

// 1. Get the hash from the database
// 2. Get the password the guard just typed
const matches = await bcrypt.compare(typedPassword, storedHash);

if (matches) {
  // Access Granted!
} else {
  // Access Denied.
}