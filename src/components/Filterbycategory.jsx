import React, {useEffect, useState} from 'react';
import ArtCardGroup from "./ArtCardGroup";
import {useParams} from "react-router-dom";
import route from "../utils/help";

function Filterbycategory() {
    const {categoryid} = useParams();
    const [artworks, setArtworks] = useState([]);
    const [categoryName, setCategoryName] = useState(""); // State to hold category name

    const getArtworksByCategory = async () => {
        try {
            const response = await fetch(`${route}/artworks/category/${categoryid}`);
            const data = await response.json();
            setArtworks(data);
        } catch (error) {
            // Handle the error condition
            console.error("Error fetching artworks:", error);
        }
    }

    const getCategoryName = async () => {
        try {
            const res = await fetch(`${route}/categories/${categoryid}`);
            const data = await res.json();
            setCategoryName(data.name);
        } catch (error) {
            // Handle the error condition
            console.error("Error fetching category name:", error);
        }
    }

    useEffect(() => {
        getArtworksByCategory();
        getCategoryName(); // Fetch category name when component mounts or categoryid changes
    }, [categoryid]);

    return (
        <ArtCardGroup data={artworks} title={`Artworks: ${categoryName}`}/>
    );
}

export default Filterbycategory;
