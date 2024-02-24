import React, {useEffect} from 'react';
import Artcard from "./Artcard";

function ArtCardGroup({data, edit, title}) {
    useEffect(() => {
    }, []);
    return (
        <div>
            <p className="md:text-2xl sm:text-xl text-lg font-medium my-8 ">{title}</p>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10">
                {data.length > 0 && data?.map((artwork, index) => (
                    <Artcard key={index} edit={edit} artwork={artwork}/>
                ))}
            </div>
            {data?.length === 0 &&
                <div className={`h-[200px] justify-center flex text-lg items-center`}>No Artworks Found.</div>}

        </div>
    );
}

export default ArtCardGroup;
