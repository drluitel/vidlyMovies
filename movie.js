const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());  // adding the pice of midware

const genres= [
       {id:1, name: "Action"},
       {id:2, name: "Comedy"},
       {id:3, name: "Adventure"},
       {id:4, name: "Crime"}
];
// All of these methdes are correnponding to HTTP verbs
app.get('/', (req,res)=>{  // call back functionso or route handeller: (path, callbackfuncton)
res.send('Are you looking for movies Genre');
});

app.get('/api/genres', (req,res)=>{  // call back functionso or route handeller: (path, callbackfuncton);
    res.send(genres);
    });
    
app.get('/api/genres/:id', (req,res)=>{  // call back functionso or route handeller: (path, callbackfuncton)
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre)  res.status(404).send('The movies not found.');
    res.send(genre);
    });

app.post('/api/genres', (req, res) => { // creating the movies genre or types

    const {error} = validateGenres(req.body);
     if(error){ res.status(400).send(error.details[0].message);
    return;
     }
    const genre ={
    id: genres.length +1,
    name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});
 
app.put('/api/genres/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
     res.status(404).send('The movies genres with is not found.');  // if id is not found
    return;
    }
    // if id is found. we have to validate
    const {error} = validateGenres(req.body);
     if(error){ res.status(400).send(error.details[0].message);
    return;
    }
    // update of movies genres
    genre.name = req.body.name;
    // return the update genres
    res.send(genre);
});

function validateGenres(genre){
    const schema = {
    name: Joi.string().min(3).required()
     };
    return Joi.validate(genre, schema);

}

app.delete('/api/genres/:id', (req, res)=>{
const genre = genres.find(c => c.id === parseInt(req.params.id));
if(!genre) {
res.status(404).send('The movies genres with is not found.');  // if id is not found
return;
} 
  // find the index of given id
  const index = genres.indexOf(genre);
 //delete the index
  genres.splice(index,1);
  res.send(genre);

});
//const port = process.env.PORT || 3000
app.listen(3000, ()=>{   //port 
    console.log(`Listining to port 3000.......`);

});
