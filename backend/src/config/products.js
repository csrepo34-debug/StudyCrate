export const PRODUCT_CATALOG = [
  {
    id: '1',
    title: 'DSA Complete Notes',
    description: 'Comprehensive notes covering arrays, linked lists, trees, graphs, and sorting algorithms.',
    category: 'DSA',
    price: 299,
    fileName: 'product_1.pdf',
    isActive: true
  },
  {
    id: '2',
    title: 'Web Dev Bootcamp Code Pack',
    description: 'Ready-to-use React + Node.js starter projects and utilities.',
    category: 'Programming',
    price: 499,
    fileName: 'product_2.pdf',
    isActive: true
  },
  {
    id: '3',
    title: 'ML Interview Questions',
    description: '50+ common ML/DL interview questions with solutions.',
    category: 'ML',
    price: 199,
    fileName: 'product_3.pdf',
    isActive: true
  },
  {
    id: '4',
    title: 'System Design Guide',
    description: 'Scalability, databases, caching, and real-world architecture patterns.',
    category: 'DAA',
    price: 349,
    fileName: 'product_4.pdf',
    isActive: true
  },
  {
    id: '5',
    title: 'Data Science Cheatsheet',
    description: 'Pandas, NumPy, Matplotlib code snippets and best practices.',
    category: 'DS',
    price: 149,
    fileName: 'product_5.pdf',
    isActive: true
  },
  {
    id: 'python-beginner-level',
    title: 'Python Beginner Level',
    description: 'Step-by-step Python fundamentals with exercises, cheat sheets, and starter scripts for new learners.',
    category: 'Programming Languages',
    price: 10,
    fileName: 'Beginner.zip',
    isActive: true
  }
];

const productMap = new Map(PRODUCT_CATALOG.map((product) => [product.id, product]));

export function getProductById(id) {
  return productMap.get(id);
}
