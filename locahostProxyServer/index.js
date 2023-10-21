var express = require("express")
var cors = require("cors")
var axios = require("axios")

var app = express()
app.use(cors())

const UPLOAD_URL = "https://d1apzeog5ntvpg.cloudfront.net"

app.all("*", async function(req, res) {
	try {
		const response = await fetch(`${UPLOAD_URL}${req.originalUrl}`, {
		  method: req.method,
		  data: req.body,
			redirect: 'manual',
		  // headers: {
			//   ...req.headers,
			//   // Add any additional headers you want to include
			//   // For example:
			//   // "Authorization": "Bearer <your-token>",
			//   Referer: "https://d1apzeog5ntvpg.cloudfront.net",
		  // },
		})
		let body
		if (response.status == 204) {
			body = null
		} else if (response?.headers?.get("content-type")?.includes("application/json")) {
			body = await response.json()
		} else if (response?.headers?.get("content-type")?.includes("text")) {
			body = new String(await response.text())
		} else {
			body = null
		}
		let headers = {}
		for (const entry of response.headers.entries()) {
			headers[entry[0]] = entry[1]
		}
		res.set(headers)
		res.status(response.status)
		res.send(body)
	} catch (err) {
		throw err
		console.log("Error making the request")
		res.send({})
	}
})

const port = 8325
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})