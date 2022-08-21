import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";
const app = express();
let products = [
  {
    id: 1,
    name: "Product1",
    description: "product 1 desc",
  },
  {
    id: 2,
    name: "Product2",
    description: "product 2 desc",
  },
];

const appRouter = trpc
  .router()
  .query("hello", {
    resolve() {
      return "hello world";
    },
  })
  .query("getProducts", {
    resolve() {
      return products;
    },
  })
  .mutation("createProduct", {
    input: z.string(),
    resolve({ input }) {
        products.push({
            id: products.length,
            name: input,
            description: input
        })
      return "product created";
    },
  });

export type AppRouter = typeof appRouter;
app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.listen(3000);
console.log("listening on port 3000");
