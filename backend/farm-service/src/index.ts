import { app, PORT, sequelize } from "./server";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'FarmLand farm API doc.',
            version: '1.0.0',
            description: 'FarmLand farm API documentation.'
        },
        servers: [
            {
                url: 'http://localhost:3002'
            }
        ]
    },
    apis: ['./**/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("🟢 Database connected successfully");

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`🚀 Farm Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("🔴 Unable to connect to the database:", error);
    }
};

startServer().then();
