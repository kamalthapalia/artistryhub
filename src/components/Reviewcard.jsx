import React, {useState, useEffect} from 'react';
import route from "../utils/help";

function Reviewcard({review}) {
    const [username, setUsername] = useState('');

    async function getArtistName(id) {
        try {
            const res = await fetch(`${route}/users/user/${id}`);
            const data = await res.json();
            setUsername(data.username);
        } catch (error) {
            console.error('Error fetching artist name:', error);
        }
    }

    useEffect(() => {
        getArtistName(review.user_id); // Pass review.user_id to getArtistName
    }, [review]);

    return (
        <div className={` border-b border-gray-300 pb-2`}>
            <div className={`flex gap-2 items-center`}>
                <img
                    className={`w-10 h-10 rounded-full object-cover border`}
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    alt=""
                />
                <p className={`font-semibold`}>{username}</p> {/* Display the fetched username */}
            </div>
            <p className={`py-3`}>{review.review}</p>
        </div>
    );
}

export default Reviewcard;
