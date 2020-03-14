import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import UserResolver from './resolvers/User'
import CategoryResolver from './resolvers/Category'
import GoodsResolver from './resolvers/GoodsItem'
import GoodsSkuResolver from './resolvers/GoodsSku'
import { ErrorInterceptor } from "./middleware/error-interceptor";


useContainer(Container);

async function init() {
  const schema = await buildSchema({
    resolvers: [UserResolver, CategoryResolver, GoodsResolver, GoodsSkuResolver],
    emitSchemaFile: true,
    dateScalarMode: 'timestamp',
    globalMiddlewares: [ErrorInterceptor],
    container: Container
  });

  const server = new GraphQLServer({
    schema,
  });

  server.start(() => console.log("Server is running on http://localhost:4000"));
}

createConnection().then(() => {
  init()

}).catch(error => console.log(error));
