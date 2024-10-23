/*
  Warnings:

  - You are about to drop the column `demos` on the `Project` table. All the data in the column will be lost.
  - Made the column `author` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Demo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Demo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "author" TEXT NOT NULL
);
INSERT INTO "new_Project" ("author", "category", "createdAt", "description", "id", "link", "public", "status", "title") SELECT "author", "category", "createdAt", "description", "id", "link", "public", "status", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
