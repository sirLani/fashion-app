import dotenv from "dotenv";
dotenv.config(); // load config vars from .env to process.env

export const env = {
  port: process.env.PORT || 8080,
  DATABASE: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.yyujm0o.mongodb.net/?retryWrites=true&w=majority`,
};
