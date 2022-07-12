const fs = require("fs");
const path = require("path");

module.exports = {
  products: JSON.parse(
    fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
  ),
  guardar: (e = products) =>
    fs.writeFileSync(
      path.join(__dirname, "products.json"),
      JSON.stringify(e, null, 2),
      "utf-8"
    ),
};
