import React, { useState } from 'react';
import mockData from "./mockData";
import { Typography } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";

const Animal = (props) => {
    const { match } = props;
    const { params } = match;
    const { animalId } = params;
    const [animal, setAnimal] = useState(mockData[`${animalId}`]);

    const generateAnimalJSX = () => {
        const { name, id, species, height, weight, types, sprites } = animal;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites; //data has multiple images, helps determine type

        return (
            <>
             <Typography variant="h1">
                {`${id}.`} {toFirstCharUppercase(name)}
                <img src={front_default} />
             </Typography>
             <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
             <Typography>Height: {height} </Typography>
             <Typography>Weight: {weight} </Typography>
             <Typography variant="h6"> Types:</Typography>
             {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <Typography key={name}> {`${name}`}</Typography>;
              })}
            </>
        )
    }
    return <>{generateAnimalJSX()}</>;
    
}

export default Animal;