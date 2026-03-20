import { createServer } from './server';

console.log('📦 Gateway started');

const {app, PORT} = createServer();

app.listen(PORT, () => {
    console.log('🚀 Farm Management API Gateway started');
    console.log(`📍 Server running on port ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API Documentation: http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = (signal: string): void => {
    console.log(`🛑 ${signal} received, shutting down gracefully`);
    process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));