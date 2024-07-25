import { Skeleton } from "@mui/material";
import { useState } from "react";

interface props {
    source: string,
    alt: string
}

export default function ImageLoader(props: props) {
    const { source, alt } = props
    const [loaded, setLoaded] = useState(false);
  
    const handleImageLoad = () => {
      console.log('Image loaded');
      setLoaded(true);
    };
    return (
        <>
            {!loaded && (
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width='100%'
                    height='234px'
                />
            )}
            <img className={loaded ? 'w-100' : 'd-none'} src={source} alt={alt} onLoad={handleImageLoad} />
        </>
    )
}
