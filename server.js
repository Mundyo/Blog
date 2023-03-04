const express= require('express');
const app= express();
const mongoose= require('mongoose');
const Article= require('./models/article')
const articleRouter= require('./routes/articles');
// const methodOverride = require('method-override');

const MongoDB = 'mongodb+srv://Mundyo:Kasongi2014@cluster0.suxct1m.mongodb.net/blog?retryWrites=true&w=majority';

console.log(MongoDB);

mongoose.set('strictQuery', true);


const connnectDB = async () => {
    await mongoose.connect(MongoDB, {
        useUnifiedTopology: true,
    });
    console.log("MongoDB is connected")
}

connnectDB();




app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
// app.use(methodOverride('_method'));

app.get('/', async(req,res)=>{
const articles =  await Article.find().sort({
  createdAt:'desc'
});
  res.render('articles/index', {articles})
});

app.use('/articles', articleRouter);


app.listen(5000);

