let { app } = require("./index");
let PORT = 3000;
app.listen(PORT, () => {
  console.log("server is listening on http://localhost:", PORT);
});
