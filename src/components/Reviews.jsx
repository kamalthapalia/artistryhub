import React, {useEffect} from 'react';
import Reviewcard from "./Reviewcard";

function Reviews({data}) {


    useEffect(() => {
    }, [data]);
    return (
        <div className={`py-14`}>
            <p className={`text-2xl font-semibold mb-5 pb-1.5 border-b `}>Reviews</p>
            {data?.map((rev, index) => (
                <Reviewcard key={index} review={rev}/>
            ))}

        </div>
    );
}

export default Reviews;