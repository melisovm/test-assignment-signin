const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./server/database.json')
const userdb = JSON.parse(fs.readFileSync('./server/users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '10h'

function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

function isAuthenticated({email}){
  return userdb.users.findIndex(user => user.email === email) !== -1
}

server.post('/auth/register', (req, res) => {
  const {email, password} = req.body;

  if(isAuthenticated({email}) === true) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({status, message});
    return
  }

  fs.readFile("./server/users.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    data = JSON.parse(data.toString());

    const lastItemId = data.users[data.users.length-1].id;

    data.users.push({id: lastItemId + 1, email, password}); // add some data
    fs.writeFile("./server/users.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})

      }
    });
  });

  const accessToken = createToken({email, password})
  res.status(200).json({accessToken})
})

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const accessToken = createToken({email, password})
  res.status(200).json({user:req.body, token:accessToken})
})

server.get('/me', (req, res) => {
  if (!userdb.users.length) {
    const status = 404
    const message = 'User not found'

    res.status(status).json({ status, message })
    return
  }

  const user = userdb.users[0]
  res.status(200).json({ ...user })
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    const verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({status, message})
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error accessToken is revoked'
    res.status(status).json({status, message})
  }
})

server.use(router)

server.listen(8000, () => {
  console.log(`Run Auth API Server 8000`)
})
