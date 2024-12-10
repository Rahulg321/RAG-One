-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";

-- CreateTable
CREATE TABLE "Embeddings" (
    "id" TEXT NOT NULL,
    "embedding" vector,

    CONSTRAINT "Embeddings_pkey" PRIMARY KEY ("id")
);


