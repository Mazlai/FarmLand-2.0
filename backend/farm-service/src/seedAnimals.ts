import AnimalType from "./models/animalType.models";
import sequelize from "./config/database";

// Données de base pour les types d'animaux
const animalTypes = [
  { label: "Chat", textIcon: "😺" },
  { label: "Chien", textIcon: "🐶" },
  { label: "Cheval", textIcon: "🐴" },
  { label: "Vache", textIcon: "🐮" },
  { label: "Cochon", textIcon: "🐷" },
  { label: "Canard", textIcon: "🦆" },
  { label: "Mouton", textIcon: "🐑" },
  { label: "Chèvre", textIcon: "🐐" },
  { label: "Poule", textIcon: "🐔" },
  { label: "Lapin", textIcon: "🐰" },
];

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Synchroniser la base de données
    await sequelize.sync({ force: true });
    console.log("📊 Database synchronized");

    // 1. Créer les types d'animaux
    console.log("🐾 Creating animal types...");
    const createdAnimalTypes = await AnimalType.bulkCreate(animalTypes);
    console.log(`✅ Created ${createdAnimalTypes.length} animal types`);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
};

// Fonction pour nettoyer la base de données
const clearDatabase = async () => {
  try {
    console.log("🧹 Clearing database...");
    await AnimalType.destroy({ where: {} });
    console.log("✅ Database cleared");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  }
};

// Exécution si le fichier est appelé directement
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✨ Seeding process completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding process failed:", error);
      process.exit(1);
    });
}

export { seedDatabase, clearDatabase };
