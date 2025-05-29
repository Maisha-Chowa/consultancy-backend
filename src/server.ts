import app from "./app";

async function Main() {
  const server = app.listen(5001, () => {
    console.log("server is running on port 5001");
  });

  //exit handler
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("server is closed");
      });
    }
    process.exit(1);
  };
  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
  };
  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
  process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    exitHandler();
  });
  process.on("SIGINT", () => {
    console.log("SIGINT received");
    exitHandler();
  });
  process.on("SIGQUIT", () => {
    console.log("SIGQUIT received");
  });
}
Main();
