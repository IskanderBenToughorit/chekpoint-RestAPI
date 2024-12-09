require('dotenv').config({ path: './config/config.env' }); 
require('dotenv').config(); 


const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Middleware pour parser les requêtes JSON

const PORT = process.env.PORT || 2100;
const uri = process.env.DB_URL; 
if (!uri) {
  console.error('Erreur : MONGO_URI n\'est pas défini dans MONGO-URI.env');
  process.exit(1); // Arrête le script si MONGO_URI est introuvable
}

mongoose.connect(uri, { useNewUrlParser: true,
  useUnifiedTopology: true })
 try{ console.log('Connexion réussie à la base de données checkpointMongoose')
 }catch{(err => console.error('Erreur de connexion à la base de données :', err))};

  
  

// Route de base
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Routes supplémentaires
const User = require('./models/user');

// GET: Retourner tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newUser = new User({ name, email, age });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// PUT: Éditer un utilisateur par ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
