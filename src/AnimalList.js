import React, { useState, useEffect } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Grid, 
    Card, 
    CardContent, 
    CircularProgress, 
    CardMedia,
    Typography,
    TextField 
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import mockData from "./mockData";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    listContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardItem: {
        cursor: 'pointer',
    },
    cardMedia: {
        margin: 'auto',
    },
    cardContent: {
        textAlign: 'center',
    },
    searchContainer: {
        display: 'flex',
        backgroundColor: fade(theme.palette.common.white, 0.15), //use colors in palette for bigger apps
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    searchIcon: {
        alignSelf: 'flex-end',
        marginBottom: '5px',
    },
    searchInput: {
        width: '200px',
        margin: '5px',
    }
}));

const AnimalList = (props) => {
    const classes = useStyles();
    const { history } = props;
    const [animalData, setAnimalData] = useState({});
    const [filter, setFilter] = useState("");

    const hanldeSearchChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    //api request
    useEffect(() => {
        axios 
          .get(`https://acnhapi.com/v1a/villagers`)
          .then(function (response) {
              const { data } = response;
              const { results } = data;
              const newAnimalData = {};
              
              data.forEach((animal, index) => {
                  newAnimalData[index + 1] = {
                      id: index + 1,
                      name: animal.name["name-USen"],
                      sprite: `https://acnhapi.com/v1/icons/villagers/${
                        index + 1
                    }`,
                  };
              });
              setAnimalData(newAnimalData);
          });
    }, []);

    const getAnimalCard = (animalId) => {
        const { id, name, sprite } = animalData[animalId];

        return(
        <Grid item xs={12} sm={4} key={animalId}>
            <Card className={classes.cardItem} onClick = {() => history.push(`/${animalId}`)}>
                <CardMedia 
                className={classes.cardMedia}
                image={sprite}
                style={{ width: "130px", height: "130px" }}
                />
                <CardContent className={classes.cardContent}>
                    <Typography>{`${toFirstCharUppercase(name)}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
        );
    };

    return (
        <>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.searchContainer}>
                <SearchIcon className={classes.searchIcon}/>
                <TextField 
                onChange={hanldeSearchChange}
                className={classes.searchInput}
                label="Animal"
                variant="standard"
                />
            </div>
        </Toolbar>        
        </AppBar>
        
        {animalData ? (
        <Grid container spacing={2} className={classes.listContainer}>
           {Object.keys(animalData).map(animalId =>
             animalData[animalId].name.toLowerCase().includes(filter) &&
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