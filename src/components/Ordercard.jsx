import React, {useEffect} from 'react';
import {LiaPaintBrushSolid} from "react-icons/lia";
import {FaRegUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import route from "../utils/help";

function Ordercard({order}) {
    const [artistName, setArtistName] = React.useState();
    const [categoryName, setCategoryName] = React.useState();
    const [image, setImage] = React.useState();
    const [title, setTitle] = React.useState();
    const [price, setPrice] = React.useState();

    async function getArtistName() {
        try {
            const res = await fetch(`${route}/users/user/${order?.artist_id}`);
            const data = await res.json();
            setArtistName(data.username);
        } catch (error) {
            // Handle the error condition appropriately
        }
    }

    async function getArtwork() {
        try {
            const res = await fetch(`${route}/artworks/artwork/order/${order?.artwork_id}`);
            const data = await res.json();
            setImage(data.image);
            setTitle(data.title);
            setPrice(data.price);
            const categoryRes = await fetch(`${route}/categories/${data.category}`);
            const categoryData = await categoryRes.json();
            setCategoryName(categoryData.name);
        } catch (error) {
            // Handle the error condition appropriately
        }
    }

    async function removeOrderitem() {
        try {
            const res = await fetch(`${route}/orders/orderitem/${order?.order_item_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            if (res.ok) {
                window.location.reload();
            }
        } catch (error) {
            // Handle the error condition appropriately
        }
    }

    useEffect(() => {
        if (order) {
            getArtistName();
            getArtwork();
        }
    }, [order])

    return (

        <div className="flex flex-col cursor-pointer">
            <img
                className="w-full h-[300px] object-cover"
                src={`${route}/image/${image}`}
                alt={title}/>
            <div className="flex mt-3 justify-between">
                <div>
                    <p className="md:text-lg font-semibold">{title}</p>
                    <div className="flex items-center gap-2">
                        <LiaPaintBrushSolid/>
                        <p>{categoryName}</p>
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                        <FaRegUser/>
                        
                        <p>{artistName}</p>
                    </div>
                </div>
                <p className="font-semibold">Rs.{price}</p>
            </div>
            <button
                className={`border-2 w-full border-rose-500 mt-6 py-1.5 rounded-2xl font-bold text-rose-500 hover:bg-rose-100 transition`}
                onClick={removeOrderitem}>Remove item from order.
            </button>
        </div>
    );
}

export default Ordercard;