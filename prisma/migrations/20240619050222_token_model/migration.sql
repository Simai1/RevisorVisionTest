-- CreateTable
CREATE TABLE "TokenModel" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TokenModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenModel_userId_key" ON "TokenModel"("userId");

-- AddForeignKey
ALTER TABLE "TokenModel" ADD CONSTRAINT "TokenModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
