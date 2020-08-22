const express = require('express');
const router = express.Router();
const Author = require('../models/author')
//All authors Route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i') //i for case insensitive 
    }
    try {
        const authors = await Author.find(searchOptions) //passed empty obj => we have no conditions, get all authors
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
    });
    } catch (error) {
        res.redirect('/')
    }
   
})

//New Author Route
router.get('/new', (req,res) => {//displaying the form
    res.render('authors/new', {author: new Author() })
})

//Create Author Route
router.post('/', async (req, res) => {//create an author after click submit
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor.id}`)
         res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
    // author.save((err, newAuthor) => { callback
    //     if(err){
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: 'Error creating Author'
    //         })
    //     }
    //     else{
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)

    //     }

    // })
    console.log('name' , req.body);
    // res.send(req.body.name); //send data to server //name input with the name="name"(=req.body.name) from the body of the form
})
module.exports = router;