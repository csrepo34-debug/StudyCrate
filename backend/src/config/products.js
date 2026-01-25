export const PRODUCT_CATALOG = [
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
  },
  {
    id: 'eda-beginner-level',
    title: 'Exploratory Data Analysis Beginner',
    description:
      'Introductory EDA resources to help you explore, clean, and understand datasets using practical examples.',
    category: 'data analysis',
    price: 50,
    fileName: 'Beginner_EDA.zip',
    driveUrl:
      'https://drive.google.com/file/d/13RPgU-UPS0tJQy3x4vtIXssAJpiBYVmA/view?usp=drive_link',
    isActive: true
  },
  {
    id: 'eda-intermediate-level',
    title: 'Exploratory Data Analysis Intermediate',
    description:
      'Intermediate-level EDA materials focusing on feature engineering, visualization, and deeper data insights.',
    category: 'data analysis',
    price: 100,
    fileName: 'Intermediate_EDA.zip',
    driveUrl:
      'https://drive.google.com/file/d/1xDn_jSWESUpNjHEls6t69gYeUDdmhNm8/view?usp=drive_link',
    isActive: true
  }
];

const productMap = new Map(PRODUCT_CATALOG.map((product) => [product.id, product]));

export function getProductById(id) {
  return productMap.get(id);
}
