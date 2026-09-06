export type Category = "Cafés Especiales" | "Postres" | "Desayunos" | "Bebidas Frías";

export const categories: Category[] = [
  "Cafés Especiales",
  "Postres",
  "Desayunos",
  "Bebidas Frías",
];

export type Product = {
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    name: "Espresso Aurora",
    description: "Doble shot de origen único, notas de cacao y panela. Cuerpo intenso y final limpio.",
    price: 8,
    category: "Cafés Especiales",
    image: u("photo-1510707577719-ae7c14805e3a"),
  },
  {
    name: "Cappuccino Dorado",
    description: "Espresso con leche texturizada y un velo de cúrcuma dorada y canela de Ceilán.",
    price: 12,
    category: "Cafés Especiales",
    image: u("photo-1572442388796-11668a67e53d"),
  },
  {
    name: "Latte de Lavanda",
    description: "Infusión artesanal de lavanda, leche entera sedosa y espresso de altura.",
    price: 14,
    category: "Cafés Especiales",
    image: u("photo-1541167760496-1628856ab772"),
  },
  {
    name: "Frappé Caramelo",
    description: "Cold brew batido con hielo, caramelo salado de la casa y crema batida ligera.",
    price: 16,
    category: "Bebidas Frías",
    image: u("photo-1461023058943-07fcbe16d735"),
  },
  {
    name: "Cold Brew Cítrico",
    description: "18 horas de extracción en frío con toque de naranja sanguina y tónica artesanal.",
    price: 15,
    category: "Bebidas Frías",
    image: u("photo-1517701550927-30cf4ba1dba5"),
  },
  {
    name: "Croissant de Almendra",
    description: "Hojaldre de mantequilla laminado 72 horas, relleno de crema de almendra tostada.",
    price: 9,
    category: "Postres",
    image: u("photo-1555507036-ab1f4038808a"),
  },
  {
    name: "Cheesecake de Frutos Rojos",
    description: "Base de galleta artesanal, queso crema batido y coulis de frutos rojos andinos.",
    price: 13,
    category: "Postres",
    image: u("photo-1533134242443-d4fd215305ad"),
  },
  {
    name: "Tostadas Avocado",
    description: "Pan de masa madre, palta cremosa, huevo pochado y semillas tostadas.",
    price: 18,
    category: "Desayunos",
    image: u("photo-1541519227354-08fa5d50c44d"),
  },
  {
    name: "Pancakes de Arándano",
    description: "Torre de pancakes esponjosos con arándanos frescos y miel de algarrobo.",
    price: 16,
    category: "Desayunos",
    image: u("photo-1567620905732-2d1ec7ab7445"),
  },
];

export type LibraryBook = {
  title: string;
  author: string;
  genre: string;
  cover: string;
};

export const libraryBooks: LibraryBook[] = [
  {
    title: "El asiento del Alma",
    author: "Gary Zukav",
    genre: "Espiritualidad",
    cover: u("photo-1419242902214-272b3f66ee7a"),
  },
  {
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    genre: "Misterio",
    cover: u("photo-1481627834876-b7833e8f5570"),
  },
  {
    title: "Home Barista",
    author: "Simeone Egger & Ruby Ashby",
    genre: "Gastronomía",
    cover: u("photo-1495474472287-4d71bcdd2085"),
  },
  {
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    genre: "Clásico",
    cover: u("photo-1509316785289-025f5b846b35"),
  },
  {
    title: "El infinito en un junco",
    author: "Irene Vallejo",
    genre: "Ensayo",
    cover: u("photo-1457369804613-52c61a468e7d"),
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    genre: "Realismo mágico",
    cover: u("photo-1542273917363-3b1817f69a2d"),
  },
];

export const gallery: string[] = [
  "photo-1495474472287-4d71bcdd2085",
  "photo-1445116572660-236099ec97a0",
  "photo-1554118811-1e0d58224f24",
  "photo-1509042239860-f550ce710b93",
  "photo-1521017432531-fbd92d768814",
  "photo-1481833761820-0509d3217039",
  "photo-1470337458703-46ad1756a187",
  "photo-1414235077428-338989a2e8c0",
  "photo-1559925393-8be0ec4767c8",
  "photo-1497935586351-b67a49e012bf",
  "photo-1453614512568-c4024d13c247",
  "photo-1442512595331-e89e73853f31",
].map((id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`);

export const schedule = [
  { day: "Lunes", hours: "7:00am – 9:00pm", index: 1 },
  { day: "Martes", hours: "7:00am – 9:00pm", index: 2 },
  { day: "Miércoles", hours: "7:00am – 9:00pm", index: 3 },
  { day: "Jueves", hours: "7:00am – 9:00pm", index: 4 },
  { day: "Viernes", hours: "7:00am – 9:00pm", index: 5 },
  { day: "Sábado", hours: "8:00am – 10:00pm", index: 6 },
  { day: "Domingo", hours: "9:00am – 7:00pm", index: 0 },
];

export const testimonials = [
  {
    name: "Valeria Ríos",
    date: "Marzo 2026",
    stars: 5,
    text: "El Latte de Lavanda es una obra de arte. El ambiente invita a quedarse horas leyendo.",
    avatar: "photo-1494790108377-be9c29b29330",
  },
  {
    name: "Diego Salazar",
    date: "Febrero 2026",
    stars: 5,
    text: "Mejor cold brew de Miraflores. El servicio recuerda tu nombre y tu pedido favorito.",
    avatar: "photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Camila Ferreyra",
    date: "Febrero 2026",
    stars: 5,
    text: "Reservamos para un aniversario y prepararon la mesa con velas y postre sorpresa.",
    avatar: "photo-1534528741775-53994a69daeb",
  },
  {
    name: "Martín Ocampo",
    date: "Enero 2026",
    stars: 4,
    text: "Los baristas explican cada origen con pasión. Se nota el cuidado en cada extracción.",
    avatar: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Renata Bustos",
    date: "Enero 2026",
    stars: 5,
    text: "Las tostadas de palta con masa madre son mi desayuno obligatorio los domingos.",
    avatar: "photo-1517841905240-472988babdf9",
  },
  {
    name: "Joaquín Vera",
    date: "Diciembre 2025",
    stars: 5,
    text: "Trabajo remoto perfecto: wifi impecable, luz cálida y el mejor espresso de la ciudad.",
    avatar: "photo-1519085360753-af0119f7cbe7",
  },
].map((t) => ({
  ...t,
  avatar: `https://images.unsplash.com/${t.avatar}?auto=format&fit=crop&w=200&q=80`,
}));

export const timeSlots = (() => {
  const slots: string[] = [];
  for (let h = 8; h <= 21; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h !== 21) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();
