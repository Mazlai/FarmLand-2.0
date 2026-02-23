import { app, PORT, sequelize } from "./server";

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("🟢 Database connected successfully");

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`🚀 User Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("🔴 Unable to connect to the database:", error);
    }
};

startServer().then();