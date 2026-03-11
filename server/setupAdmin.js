import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://prajwalmudrabett_db_user:PrajwalDB@cluster0.ljwzydb.mongodb.net/jitconnect?retryWrites=true&w=majority&appName=Cluster0';

const setupAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const adminEmail = 'admin@jyothyit.ac.in';
    const adminPassword = 'Admin@12345';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Check if admin exists
    let admin = await mongoose.connection.db.collection('users').findOne({ email: adminEmail });

    if (!admin) {
      // Create admin user
      await mongoose.connection.db.collection('users').insertOne({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'department',
        isAdmin: true,
        deptName: 'Administration',
        deptDescription: 'System Administration',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('✅ Admin user created successfully!');
    } else {
      // Update existing admin
      await mongoose.connection.db.collection('users').updateOne(
        { email: adminEmail },
        { $set: { isAdmin: true } }
      );
      console.log('✅ Admin privileges granted!');
    }

    console.log('\n========================================');
    console.log('Admin Credentials:');
    console.log('========================================');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('========================================');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('========================================\n');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

setupAdmin();
