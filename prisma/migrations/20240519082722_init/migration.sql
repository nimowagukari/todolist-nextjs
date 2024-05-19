-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "summary" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
