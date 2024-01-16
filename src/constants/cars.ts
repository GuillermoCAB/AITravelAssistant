const carsArray = [
  {
    id: 'd3j8dj82',
    name: 'Audi e-tron GT',
    thumbnail: '/images/cars/etron/img.png',
    images: [
      '/images/cars/etron/img1.png',
      '/images/cars/etron/img2.png',
      '/images/cars/etron/img3.png',
      '/images/cars/etron/img4.png',
      '/images/cars/etron/img5.png',
      '/images/cars/etron/img6.png',
      '/images/cars/etron/img7.png',
      '/images/cars/etron/img8.png',
    ],
    hp: 522,
    batterySize: 93,
    to60: 3.9,
  },
  {
    id: 'h5h56h56h5h',
    name: 'Audi Q4 e-tron',
    thumbnail: '/images/cars/q4etron/img.png',
    images: [
      '/images/cars/q4etron/img1.png',
      '/images/cars/q4etron/img2.png',
      '/images/cars/q4etron/img3.png',
      '/images/cars/q4etron/img4.png',
      '/images/cars/q4etron/img5.png',
      '/images/cars/q4etron/img6.png',
      '/images/cars/q4etron/img7.png',
      '/images/cars/q4etron/img8.png',
    ],
    hp: 295,
    batterySize: 82,
    to60: 5.8,
  },
  {
    id: '345t6tg67uh',
    name: 'Audi Q8 e-tron',
    thumbnail: '/images/cars/q8etron/img.png',
    images: [
      '/images/cars/q8etron/img1.png',
      '/images/cars/q8etron/img2.png',
      '/images/cars/q8etron/img3.png',
      '/images/cars/q8etron/img4.png',
      '/images/cars/q8etron/img5.png',
      '/images/cars/q8etron/img6.png',
      '/images/cars/q8etron/img7.png',
      '/images/cars/q8etron/img8.png',
    ],
    hp: 402,
    batterySize: 106,
    to60: 5.4,
  },
];

export const carsArrayName = carsArray.map(car => car.name);

export default carsArray;
