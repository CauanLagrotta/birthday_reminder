/*
  Warnings:

  - You are about to drop the column `date` on the `birthdays` table. All the data in the column will be lost.
  - Added the required column `day` to the `birthdays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `birthdays` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_birthdays" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "birthday_person" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "birthdays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_birthdays" ("birthday_person", "id", "userId") SELECT "birthday_person", "id", "userId" FROM "birthdays";
DROP TABLE "birthdays";
ALTER TABLE "new_birthdays" RENAME TO "birthdays";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
