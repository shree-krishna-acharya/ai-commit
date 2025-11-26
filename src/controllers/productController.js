const products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 50 },
  { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics', stock: 200 }
];

let nextId = 3;

const getAllProducts = (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }
  
  res.json({ success: true, data: filteredProducts });
};

const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  
  res.json({ success: true, data: product });
};

const createProduct = (req, res) => {
  const { name, price, category, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Name and price are required' });
  }
  
  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    category: category || 'Uncategorized',
    stock: stock || 0
  };
  
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
};

const updateProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  
  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json({ success: true, data: products[productIndex] });
};

const deleteProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.json({ success: true, message: 'Product deleted successfully' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
