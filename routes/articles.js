

const express = require('express')
const article = require('./../models/article')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})


router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
})



router.post('/', async (req, res, next) => {
  console.log("POST Action")
  let article = new Article()

  article.title = req.body.title
  article.description = req.body.description
  article.markdown = req.body.markdown

  try {
    article = await article.save()
    res.redirect(`/articles/${article.slug}`)
  } catch (e) {
    console.warn(e)
    res.render(`articles/new`, { article: article })
  }
   next()
});



router.put('/:id', async (req, res, next) => {
req.article = await Article.findById(req.params.id)

  let article = req.article
  article.title = req.body.title
  article.description= req.body.description
  article.markdown= req.body.markdown
next()
try{
  article= await article.save()
  res.redirect(`/articles/${article.slug}`)
} catch(e){
  res.render('articles/edit', {article: article})
}
})





router.delete('/:id', async (req, res) => {
  await article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router
