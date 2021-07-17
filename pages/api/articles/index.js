const {articles} = require('./data.json')

export default (req, res) => {
  if(req.method === 'GET'){
    res.json(articles)
    res.statusCode = 200
  }else{
    res.setHeader('Allow',['GET'])
    res.status(405).json({message:`Method ${req.method} is not allowed`})
  }
}
