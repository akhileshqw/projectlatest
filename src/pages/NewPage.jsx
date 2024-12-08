import React from "react";
import { ChevronRight, Leaf, Clock, Droplet, Award, Star } from "lucide-react";

export default function FreshMilkPage() {
    return (
        <div className="container mx-auto p-4">
            <nav className="text-sm breadcrumbs mb-4">
                <ul className="flex items-center space-x-2">
                    <li>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Home
                        </a>
                    </li>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <li>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Products
                        </a>
                    </li>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <li className="text-gray-700">Milk Coconut Water</li>
                </ul>
            </nav>

            <div className="flex flex-col md:flex-row gap-6">
                <aside className="w-full md:w-1/4">
                    <CategorySidebar />
                </aside>

                <main className="w-full md:w-3/4">
                    <h1 className="text-2xl font-bold mb-6">
                        Buy Fresh Milk Online
                    </h1>
                    <div className="grid md:grid-cols-2 gap-6">
                        <ProductCard
                            image="/placeholder.svg"
                            name="Coconut Water"
                            quantity="1 pc (270 to 300 ml)"
                            features={[
                                {
                                    icon: Leaf,
                                    text: "Free from Added Preservatives",
                                },
                                {
                                    icon: Star,
                                    text: "Naturally Sweet and milky taste",
                                },
                                { icon: Leaf, text: "No Added Sugar" },
                                {
                                    icon: Star,
                                    text: "Naturally Sweet and Tasty",
                                },
                                {
                                    icon: Clock,
                                    text: "Assured Delivery by 7 AM",
                                },
                                { icon: Droplet, text: "Lots of Water" },
                            ]}
                            orderText="Order Fresh Tender Coconut water Online"
                        />
                        <ProductCard
                            image="/placeholder.svg"
                            name="A2 Cow Milk"
                            quantity="1 L"
                            features={[
                                {
                                    icon: Award,
                                    text: "Undergoes 140+ Tests Daily",
                                },
                                {
                                    icon: Star,
                                    text: "Ideal For Kids and Elderly Both",
                                },
                                {
                                    icon: Star,
                                    text: "Naturally Sweet and Tasty",
                                },
                                {
                                    icon: Clock,
                                    text: "Assured Delivery by 7 AM",
                                },
                                {
                                    icon: Leaf,
                                    text: "Free from Additives, Adulteration, and Preservatives",
                                },
                            ]}
                            orderText="Order Indian Desi Cow A2 Milk Online across India from Country Delight"
                        />
                        <ProductCard
                            image="/placeholder.svg"
                            name="Buffalo Milk"
                            quantity="450 ml"
                            features={[
                                {
                                    icon: Leaf,
                                    text: "Free from Added Preservatives",
                                },
                                { icon: Leaf, text: "No Added Sugar" },
                            ]}
                        />
                        <ProductCard
                            image="/placeholder.svg"
                            name="Cow Milk"
                            quantity="450 ml"
                            features={[
                                {
                                    icon: Leaf,
                                    text: "Free from Added Preservatives",
                                },
                                { icon: Leaf, text: "No Added Sugar" },
                            ]}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}


