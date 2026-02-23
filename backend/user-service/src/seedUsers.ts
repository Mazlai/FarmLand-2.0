import { faker } from "@faker-js/faker";
import sequelize from "./config/database";
import User from "./models/user.models";

async function seed() {
    try {
        await sequelize.sync();

        const availableGenders = ['male', 'female'];

        const userData = [];
        for (let i = 0; i < 10; i++) {
            userData.push({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                birthDate: faker.date.anytime(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                gender: availableGenders[Math.floor(Math.random() * availableGenders.length)] ?? '',
                passwordHash: faker.internet.password()
            });
        }

        await User.bulkCreate(userData);

        console.log("Seed done: 10 users created");
        process.exit(0);
    } catch (err) {
        console.error("Seed error:", err);
        process.exit(1);
    }
}

seed();
