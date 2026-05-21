const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Product = require('./models/Product');

// Load env
dotenv.config({ path: path.join(__dirname, '.env') });

const dummyProducts = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Experience premium sound quality with active noise cancellation."
  },
  {
    name: "Minimalist Smartwatch",
    price: 199.50,
    category: "Wearables",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "Sleek and stylish smartwatch with fitness tracking capabilities."
  },
  {
    name: "Ergonomic Office Chair",
    price: 149.00,
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80",
    description: "Support your back with this high-quality ergonomic chair."
  },
  {
    name: "Mechanical Gaming Keyboard",
    price: 129.99,
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
    description: "Tactile and responsive keys to enhance your gaming experience."
  },
  {
    name: "Professional Camera Lens",
    price: 899.00,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=500&q=80",
    description: "Capture razor-sharp details with this professional lens."
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    description: "Bring the party with you with this powerful waterproof speaker."
  },
  {
    name: "Premium Leather Backpack",
    price: 115.00,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    description: "Durable and fashionable leather backpack for everyday use."
  },
  {
    name: "4K Action Camera",
    price: 349.00,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    description: "Record your outdoor adventures in crystal-clear 4K resolution."
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to DB at:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected!');

    // Clear existing
    await Product.deleteMany({});
    console.log('Products cleared!');

    // Find or create admin user
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('Creating default admin user...');
      adminUser = new User({
        name: 'Default Admin',
        email: 'admin@shopsphere.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Default admin user created!');
    }

    // Insert new products
    const productsWithUser = dummyProducts.map(p => ({
      ...p,
      user: adminUser._id,
      countInStock: 10
    }));

    await Product.insertMany(productsWithUser);
    console.log('Database Seeded Successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
};

seedDB();
