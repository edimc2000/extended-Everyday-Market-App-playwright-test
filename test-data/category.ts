export interface ICategory {
    id: number;
    name: string;
    description: string;
    longDescription: string;
    imageUrl: string;
}

export  const  CATEGORIES: readonly ICategory[] = [
    {
        id: 1,
        name: "Men",
        description: "Men's fashion and clothing",
        longDescription: "Discover the latest trends in men's fashion including formal wear, casual outfits, accessories, and footwear. From classic styles to modern designs, find everything for the contemporary man.",
        imageUrl: "/assets/images/men.webp"
    },
    {
        id: 2,
        name: "Women",
        description: "Women's apparel and accessories",
        longDescription: "Explore our extensive collection of women's clothing, jewelry, handbags, and footwear. Featuring seasonal collections, designer labels, and everyday essentials for every occasion.",
        imageUrl: "/assets/images/women.webp"
    },
    {
        id: 3,
        name: "Kids",
        description: "Clothing and toys for children",
        longDescription: "Find adorable and comfortable clothing for children of all ages, from newborns to teenagers. Our collection includes educational toys, school supplies, and seasonal wear for growing kids.",
        imageUrl: "/assets/images/kids.webp"
    },
    {
        id: 4,
        name: "Sports",
        description: "Sports equipment and activewear",
        longDescription: "Elevate your fitness journey with our comprehensive sports collection including athletic apparel, exercise equipment, sports gear, and nutritional supplements for all fitness levels.",
        imageUrl: "/assets/images/sports.webp"
    },
    {
        id: 5,
        name: "Sleepwear",
        description: "Comfortable sleepwear and loungewear",
        longDescription: "Transform your nighttime routine with our premium collection of sleepwear, loungewear, and comfortable essentials for rest. Featuring both established brands and emerging innovators in sleep comfort and style.",
        imageUrl: "/assets/images/sleepwear.webp"
    },

]