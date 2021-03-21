import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Button} from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const Animal = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { animalId } = params;
    const [animal, setAnimal] = useState(undefined);

    useEffect(() => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${animalId}/`)
          .then(function (response) {
            const { data } = response;
            setAnimal(data);
          })
          .catch(function (error) {
            setAnimal(false);
          });
      }, [animalId]);
    

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
    return (<>
    {animal === undefined && <CircularProgress />}
    {animal !== undefined && animal && generateAnimalJSX()}
    {animal === false && <Typography>Animal not found</Typography>}
    
    {animal !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
            back to animal list
        </Button>
    )}
    </>
    );
};

export default Animal;