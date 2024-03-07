import React, {useState} from 'react';
import Hero from "../components/Hero";
import ArtCardGroup from "../components/ArtCardGroup";
import FeaturedArtists from "../components/FeaturedArtists";
import {Link} from "react-router-dom";
import Testimonials from "../components/Testimonials";
import route from "../utils/help";

function Home() {
    document.title = 'Art Gallery | Home';
    const [artworks, setArtworks] = React.useState([{}]);
    const [categories, setCategories] = React.useState([{}]);

    async function getArtworks() {
        try {
            const res = await fetch(`${route}/artworks/all`);
            const data = await res.json();
            setArtworks(data);
        } catch (error) {
            console.error('Failed to fetch artworks:', error);
        }
    }

    async function getCategories() {
        try {
            const res = await fetch(`${route}/categories/`);
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error("Error getting categories:", error.message);
        }
    }

    React.useEffect(() => {
        getArtworks();
        getCategories()
    }, []);
    return (
        <div>
            <Hero/>
            <div className={`my-14`}>
                <div className={` border-b my-6`}>
                    <p className={`font-md text-2xl text-center py-2`}>Filter by Price</p>
                    <div className={`flex flex-wrap items-center justify-center gap-3 pt-2 pb-6`}>
                        <Link to={`/price/0/10000`}>
                            <button
                                className={`border border-gray-400 rounded-3xl font-semibold px-8 py-2 transition hover:bg-gray-100 font-medium`}>
                                Under Rs.10,000
                            </button>
                        </Link>
                        <Link to={`/price/10000/100000`}>
                            <button
                                className={`border border-gray-400 rounded-3xl font-semibold px-8 py-2 transition hover:bg-gray-100 font-medium`}>
                                Rs.10,000 - Rs.1,00,000
                            </button>
                        </Link>
                        <Link to={`/price/100000/1000000`}>
                            <button
                                className={`border border-gray-400 rounded-3xl font-semibold px-8 py-2 transition hover:bg-gray-100 font-medium`}>
                                Rs.1,00,000 - Rs.10,00,000
                            </button>
                        </Link>
                        <Link to={`/price/1000000/100000000`}>
                            <button
                                className={`border border-gray-400 rounded-3xl font-semibold px-8 py-2 transition hover:bg-gray-100 font-medium`}>
                                Rs.10,00,000+
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={` border-b my-6`}>
                    <p className={`font-md text-2xl text-center py-2`}>Filter by Category</p>
                    <div className={`flex flex-wrap items-center justify-center gap-3 pt-2 pb-6`}>
                        {categories?.slice(0, 4).map((category, index) => (
                            <Link key={index} to={`/category/${category.id}`}>
                                <button
                                    className={`border border-gray-400 rounded-3xl font-semibold px-8 py-2 transition hover:bg-gray-100 font-medium`}>
                                    {category.name}
                                </button>
                            </Link>
                        ))}

                    </div>
                </div>

            </div>
            {artworks && <ArtCardGroup data={artworks.slice(0, 8)} title={`Latest`}/>}

            <FeaturedArtists/>
            <Testimonials/>
        </div>
    );
}

export default Home;