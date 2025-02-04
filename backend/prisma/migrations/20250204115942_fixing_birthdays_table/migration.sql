/*
  Warnings:

  - You are about to drop the `Birthdays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Birthdays";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "birthdays" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "birthday_person" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "birthdays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
