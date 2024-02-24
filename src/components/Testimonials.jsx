import React from 'react';

function Testimonials() {
    const testimonials = [
        {
            username: "Harihar",
            role: "Art Lover",
            text: "Discovering this art platform was a game-changer for me. Their diverse collection and user-friendly interface make finding the perfect artwork effortless. My home feels like a curated gallery thanks to their unique pieces."
        },
        {
            username: "Fangjang",
            role: "Loyal Customer",
            text: "I've been a loyal customer of this art platform for years. Their commitment to showcasing emerging artists alongside established talents ensures there's always something new to discover. Plus, their customer service is top-notch."
        },
        {
            username: "Rsvgsng",
            role: "Artist",
            text: "As an artist, partnering with this art platform has been exceptional. They provide a global platform for artists while ensuring fair compensation. Whether you're an artist or art lover, this platform is a must-visit destination."
        }
    ];


    return (
        <div>
            <p className={`py-10 text-2xl font-medium `}>Testimonials:</p>
            <div className={`grid gap-10  md:grid-cols-3`}>
                {testimonials.map(test => (<div className={`py-14 px-4 bg-rose-50/50 shadow-xl rounded-3xl`}>
                    <div>
                        <p className={`mb-6 text-lg`}>{test.text}</p>
                        <div className={`flex items-center gap-4`}>
                            <img className={`w-10 h-10 border-gray-500 border rounded-full`}
                                 src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                 alt=""/>
                            <div>
                                <p className={`font-semibold`}>{test.username}</p>
                                <p className={`text-gray-500`}>{test.role}</p>
                            </div>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
    );
}

export default Testimonials;