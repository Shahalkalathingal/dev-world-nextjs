const { articles } = require('./data.json')

export default (req, res) => {
    const article = articles.filter(post => post.slug === req.query.slug)

    if (req.method === 'GET') {
        res.json(article)
        res.statusCode = 200
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} is not allowed` })
    }
}
