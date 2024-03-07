import React, {useState, useEffect} from 'react';
import ArtCardGroup from "../components/ArtCardGroup";
import route from "../utils/help";

function Shop({category}) {
    document.title = 'Art Gallery | Shop';
    const [artworks, setArtworks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        getCategories();
        getArtworks();
    }, []);
    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
    }, [category])

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }

    function filterArtworksByCategory() {
        if (!selectedCategory) {
            return artworks;
        }
        return artworks.filter(artwork => artwork.category === parseInt(selectedCategory));
    }


    return (
        <div className={`min-h-[750px]`}>
            <div className={`py-4 flex flex-col  gap-3`}>
                <p className={`font-semibold text-2xl`}>Filter by category.</p>
                {categories.length > 0 && (
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className={`flex w-full items-center gap-2 border border-gray-400 px-10 py-1.5 rounded-2xl transition`}
                        name=""
                        id=""
                    >
                        {/* Render options dynamically */}
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <ArtCardGroup data={filterArtworksByCategory()} title={`Artworks`}/>
        </div>
    );
}

export default Shop;
