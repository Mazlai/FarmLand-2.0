import ToolType from './models/toolType.models';
import sequelize from './config/database';

// Données de base pour les types d'outils
const toolTypes = [
    {label: 'Tracteur', textIcon: '😺'},
    {label: 'Moissoneuse', textIcon: '🐶'},
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Synchroniser la base de données
        await sequelize.sync({force: true});
        console.log('📊 Database synchronized');

        // 1. Créer les types d'outils
        console.log('🐾 Creating tool types...');
        const createdToolTypes = await ToolType.bulkCreate(toolTypes);
        console.log(`✅ Created ${createdToolTypes.length} tool types`);

        console.log('🎉 Database seeding completed successfully!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};

// Fonction pour nettoyer la base de données
const clearDatabase = async () => {
    try {
        console.log('🧹 Clearing database...');
        await ToolType.destroy({where: {}});
        console.log('✅ Database cleared');
    } catch (error) {
        console.error('❌ Error clearing database:', error);
        throw error;
    }
};

// Exécution si le fichier est appelé directement
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('✨ Seeding process completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Seeding process failed:', error);
            process.exit(1);
        });
}

export { seedDatabase, clearDatabase };