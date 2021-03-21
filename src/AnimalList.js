import React, { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Grid, Card, 
    CardContent, 
    CircularProgress, 
    CardMedia,
    Typography 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import mockData from "./mockData";
import { toFirstCharUppercase } from "./constants";

const useStyles = makeStyles({
    listContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
})

const AnimalList = (props) => {
    const { history } = props;
    const classes = useStyles();
    const [animalData, setAnimalData] = useState(mockData);

    const getAnimalCard = (animalId) => {
        console.log(animalData[`${animalId}`]);
        const { id, name } = animalData[`${animalId}`];
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            animalId
          }.png`;

        return(
        <Grid item xs={12} sm={4} key={animalId}>
            <Card onClick = {() => history.push(`/${animalId}`)}>
                <CardMedia 
                className={classes.cardMedia}
                image={sprite}
                style={{ width: "130px", height: "130px" }}
                />
                <CardContent className={classes.cardContent}>
                    <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
        );
    };

    return (
        <>
        <AppBar position="static">
            <Toolbar />
        </AppBar>
        {animalData ? (
        <Grid container spacing={2} className={classes.listContainer}>
           {Object.keys(animalData).map(animalId =>
             getAnimalCard(animalId)
            )}
        </Grid>
        ) : (
            <CircularProgress />
        )}
        </>
    );
};

export default AnimalList;