const bcrypt = require('bcryptjs');
const { db, User, Task } = require('./setup');

async function seedDatabase() {
    try {
        await db.sync({ force: true });
        console.log('Database reset successfully.');

        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = await User.bulkCreate([
            { name: 'John Doe', email: 'john@example.com', password: hashedPassword },
            { name: 'Jane Smith', email: 'jane@example.com', password: hashedPassword },
            { name: 'Mike Johnson', email: 'mike@example.com', password: hashedPassword }
        ]);

        await Task.bulkCreate([
            { title: 'Complete project documentation', description: 'Write API docs', priority: 'high', completed: false, userId: users[0].id },
            { title: 'Review code changes', description: 'Review PRs', priority: 'medium', completed: true, userId: users[0].id },
            { title: 'Update dependencies', description: 'Update npm packages', priority: 'low', completed: false, userId: users[0].id },

            { title: 'Design new UI', description: 'Dashboard mockups', priority: 'high', completed: false, userId: users[1].id },
            { title: 'Test API endpoints', description: 'Full API testing', priority: 'medium', completed: false, userId: users[1].id },
            { title: 'Setup CI/CD pipeline', description: 'Automated deployment', priority: 'high', completed: true, userId: users[1].id },

            { title: 'Database optimization', description: 'Improve queries', priority: 'medium', completed: false, userId: users[2].id },
            { title: 'Security audit', description: 'Audit app security', priority: 'high', completed: false, userId: users[2].id },
            { title: 'Write unit tests', description: 'Add tests', priority: 'medium', completed: true, userId: users[2].id },
            { title: 'Deploy to production', description: 'Deploy app', priority: 'high', completed: false, userId: users[2].id }
        ]);

        console.log('Database seeded successfully!');
        console.log('Sample users:');
        console.log('- john@example.com / password123');
        console.log('- jane@example.com / password123');
        console.log('- mike@example.com / password123');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await db.close();
    }
}

seedDatabase();
