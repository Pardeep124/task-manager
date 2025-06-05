const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
      try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    const shutdown = async () => {
      console.log("Graceful shutdown initiated...");
      await mongoose.connection.close();
      console.log("MongoDB disconnected");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);  
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
})();