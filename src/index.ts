import "reflect-metadata";
import { createConnection } from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import UserResolver from './resolvers/User'
import CategoryResolver from './resolvers/Category'
import { ErrorInterceptor } from "./middleware/error-interceptor";


async function init() {
  const schema = await buildSchema({
    resolvers: [UserResolver, CategoryResolver],
    emitSchemaFile: true,
    dateScalarMode: 'timestamp',
    globalMiddlewares: [ErrorInterceptor]
  });

  const server = new GraphQLServer({
    schema,
  });

  server.start(() => console.log("Server is running on http://localhost:4000"));
}
  
createConnection().then(() => {
    init()
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
