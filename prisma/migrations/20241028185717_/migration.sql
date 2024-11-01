-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FriendsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FriendsToUser_AB_unique" ON "_FriendsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendsToUser_B_index" ON "_FriendsToUser"("B");

-- AddForeignKey
ALTER TABLE "_FriendsToUser" ADD CONSTRAINT "_FriendsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Friends"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendsToUser" ADD CONSTRAINT "_FriendsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
