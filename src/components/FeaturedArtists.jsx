import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import route from "../utils/help";

function FeaturedArtists() {
    const [featuredArtists, setFeaturedArtists] = useState([]);

    async function getFeaturedArtists() {
        try {
            const res = await fetch(`${route}/users/artists`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setFeaturedArtists(data);
        } catch (error) {
            console.error('Error fetching featured artists:', error.message);
        }
    }

    useEffect(() => {
        getFeaturedArtists();
    }, []);

    return (
        <div className={`my-8`}>
            <div>
                <div>
                    <p className={`text-2xl font-medium py-10`}>Featured Artists</p>

                    <div className={`grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8`}>
                        {featuredArtists.slice(0, 3).map((artist) => (
                            <Link key={artist.id} to={`/artist/${artist.id}`}>
                                <div className={`flex flex-col justify-center items-center`}>
                                    <img
                                        className={`h-[250px] w-[250px] rounded-full object-cover`}
                                        src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
                                        alt={artist.username}
                                    />
                                    <p className={`md:text-xl text-lg font-medium mt-3 text-center`}>{artist.username}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedArtists;
