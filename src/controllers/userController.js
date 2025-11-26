const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
];

let nextId = 3;

const getAllUsers = (req, res) => {
  res.json({ success: true, data: users });
};

const getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.json({ success: true, data: user });
};

const createUser = (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  
  const newUser = {
    id: nextId++,
    name,
    email,
    role: role || 'user'
  };
  
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
};

const updateUser = (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json({ success: true, data: users[userIndex] });
};

const deleteUser = (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.json({ success: true, message: 'User deleted successfully' });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
