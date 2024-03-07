import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import ArtCardGroup from "./ArtCardGroup";
import route from "../utils/help";

function Filterbyprice() {
    const {min, max} = useParams();
    const [artworks, setArtworks] = useState([]);
    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);

        // Replace the currency symbol from ₹ to Rs.
        return formattedPrice.replace('₹', 'Rs.');
    };


    const getArtworksBetween = async () => {
        try {
            const response = await fetch(`${route}/artworks/price/${min}/${max}`);
            const data = await response.json();
            setArtworks(data);
            // if(data.code==400){
            //     toast(`No artworks found `)
            // }
            // else{
            // }
        } catch (error) {
            // Handle error silently
        }
    }

    useEffect(() => {
        getArtworksBetween();
    }, [min, max]);
    return (
        <div>

            <ArtCardGroup data={artworks} title={`Artworks between ${formatPrice(min)} and ${formatPrice(max)} `}/>
        </div>
    );
}

export default Filterbyprice;