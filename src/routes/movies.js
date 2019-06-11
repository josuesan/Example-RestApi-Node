const { Router } = require("express");
const router = Router();

const movies = require("../samples.json");

router.get("/", (req, res)=>{
    res.json(movies);
});

router.post("/", (req, res)=>{
    const { title, director, year, rating } = req.body;
    if(!(title && director && year && rating)){ 
        res.status(500).send("Wrong Request");
    }
    const id = movies.length +1;
    const newMovie = {...req.body, id}
    movies.push(newMovie);
    res.status(200).json(movies);
    
});

router.delete("/:id", (req, res)=>{
    const { id } = req.params;
    if(id === undefined){ 
        res.status(500).send("Wrong Request");
    }
    const newMovies = movies.filter( val => val.id !== id);
    res.status(200).json(newMovies);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    if(!(id && title && director && year && rating)){ 
        res.status(500).send("Wrong Request");
    }
    movies.forEach(movie => {
        if(movie.id === id){
            movie.title = title;
            movie.director = director;
            movie.year = year;
            movie.rating = rating;
        }
    });
    res.status(200).json(movies);
});

module.exports = router;