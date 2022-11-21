const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const history = require("connect-history-api-fallback");
const router = express.Router({ strict: true });
const path = require("path");

app.enable("strict routing");
app.use(express.static("dist"));
app.use(history()); 
app.get("*", function (request, response) {
	response.sendFile(path.resolve(__dirname, "dist/index.html"));
});
app.listen(PORT, () => {
	console.log(`server on port ${PORT}!`);
});
