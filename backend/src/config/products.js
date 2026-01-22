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
    fileName: 'Beginner_Python.zip',
    driveUrl: 'https://drive.google.com/file/d/1wUsCAfB1b-AVqBz6_jY-ZPjJ2H6rWMoj/view?usp=drive_link',
    isActive: true
  },
  {
    id: 'python-intermediate-level',
    title: 'Python Intermediate Level',
    description:
      'Level up your Python with OOP, error handling, file I/O, and intermediate projects bundled together.',
    category: 'Programming Languages',
    price: 20,
    fileName: 'Intermediate_Python.zip',
    driveUrl:
      'https://drive.google.com/file/d/1DOWY6z-yDERl3QICttujpSlJYKsRCtfP/view?usp=drive_link',
    isActive: true
  },
  {
    id: 'c-beginner-level',
    title: 'C Beginner Level',
    description:
      'Start with C programming basics including syntax, data types, control flow, and beginner-level exercises.',
    category: 'Programming Languages',
    price: 10,
    fileName: 'Beginner_C.zip',
    driveUrl:
      'https://drive.google.com/file/d/11dNxzpRw6gF_lj8ixHcK8kYkaFp3OB29/view?usp=drive_link',
    isActive: true
  },
  {
    id: 'c-intermediate-level',
    title: 'C Intermediate Level',
    description:
      'Go deeper into C with pointers, memory management, structures, and intermediate projects.',
    category: 'Programming Languages',
    price: 20,
    fileName: 'Intermediate_C.zip',
    driveUrl:
      'https://drive.google.com/file/d/1xjxEpeQcKvUSHWVrpvX41_KM6T4BMVGP/view?usp=drive_link',
    isActive: true
  }
];

const productMap = new Map(PRODUCT_CATALOG.map((product) => [product.id, product]));

export function getProductById(id) {
  return productMap.get(id);
}
