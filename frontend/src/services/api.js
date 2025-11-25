const MOCK_PRODUCTS = [
  { id: 1, title: "Gaggia Classic Pro", price: 420, category: "Espresso", imageUrl: "https://www.gaggia.com/app/uploads/2023/11/Classic-Trequarti-Bianco_2018.png" }
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 1500);
  });
};