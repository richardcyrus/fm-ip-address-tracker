const axios = require('axios')

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const ipify = (req, res) => {
  const apiKey = process.env.IPIFY_API_KEY
  const apiUrl = 'https://geo.ipify.org/api/v1?'
  const { ipAddress = null } = req.query
  const { domain = null } = req.query
  let url = ''

  if (ipAddress !== null && domain === null) {
    url = `${apiUrl}apiKey=${apiKey}&ipAddress=${ipAddress}`
  } else if (domain !== null && ipAddress === null) {
    url = `${apiUrl}apiKey=${apiKey}&domain=${domain}`
  } else {
    url = `${apiUrl}apiKey=${apiKey}`
  }

  axios
    .get(url)
    .then((response) => {
      const { data } = response
      res.status(200)
      res.json(data)
    })
    .catch((err) => {
      res.status(err.response ? err.response.status : 500)
      res.send(err.message || 'Something went wrong! Please try again later.')
    })
}

module.exports = allowCors(ipify)
