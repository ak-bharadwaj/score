require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URL || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interiit-sports';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const UserModel = mongoose.model('Users', userSchema);

async function main() {
  try {
    await mongoose.connect(uri);
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = process.env.ADMIN_NAME || 'Admin';
    const role = 'ADMIN';

    const existing = await UserModel.findOne({ username });
    if (existing) {
      if (existing.role !== 'Admin') {
        existing.role = 'Admin';
        await existing.save();
        console.log(`[Seed] Updated user '${username}' role to 'Admin'.`);
      } else {
        console.log(`[Seed] User '${username}' already exists. Skipping.`);
      }
    } else {
      await UserModel.create({ name, username, password, role: 'Admin' });
      console.log(`[Seed] Created admin user '${username}'`);
    }
  } catch (err) {
    console.error('[Seed] Error seeding admin user:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
