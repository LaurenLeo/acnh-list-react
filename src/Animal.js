import React, { useState, useEffect } from 'react';
import { 
    Typography, 
    CircularProgress, 
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    cardStyles: {
        textAlign: 'center',
        justifyContent: 'space-around',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '20px',
    },
    cardMedia: {
        margin: 'auto',
    },
    cardContent: {
        textAlign: 'center',
    },
    backButton: {
        marginLeft: '20px'
    }
}));

const Animal = (props) => {
    const classes = useStyles();
    const { history, match } = props;
    const { params } = match;
    const { animalId } = params;
    const [animal, setAnimal] = useState(undefined);

    useEffect(() => {
        axios
          .get(`https://acnhapi.com/v1a/villagers/${animalId}`)
          .then(function (response) {
            const { data } = response;
            setAnimal(data);
          })
          .catch(function (error) {
            setAnimal(false);
          });
      }, [animalId]);
    

    const generateAnimalJSX = () => {
        
        const actualName = animal.name["name-USen"];
        const bday = animal["birthday-string"];
        const { name, id, species, personality, gender } = animal;
        const fullImageUrl = `https://acnhapi.com/v1/images/villagers/${id}`;
        console.log(animal)
        return (
            <>
            <Grid container justify="space-around">
            <Grid item 
            m={4}
            justify="space-around" 
            alignContent="center"
            key={id}>
            <Card className={classes.cardStyles}>
             <Typography variant="h1">
               {toFirstCharUppercase(actualName)}
             </Typography>
             <CardMedia> <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} /></CardMedia>
            <CardContent>
             <Typography>Gender: {gender} </Typography>
             <Typography>Personality: {personality} </Typography>
             <Typography>Species: {species} </Typography>
             <Typography>Birthday: {bday} </Typography>
             </CardContent>
             </Card>
             </Grid>
             </Grid>
            </>
        )
    }
    return (<>
    {animal === undefined && <CircularProgress />}
    {animal !== undefined && animal && generateAnimalJSX()}
    {animal === false && <Typography>Animal not found</Typography>}
    
    {animal !== undefined && (
        <Button className={classes.backButton} variant="contained" onClick={() => history.push("/")}>
            back to animal list
        </Button>
    )}
    </>
    );
};

export default Animal;