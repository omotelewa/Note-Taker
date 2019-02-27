const router = require("express").Router();
const db = require("../../config/connection");

router.get("/", function (req, res) {
  // query database for all notes and send back as json
  db.query("SELECT * FROM notes", function (err, results) {
    if(err) throw err;
    res.json(results);
  })
});

router.post("/", function (req, res) {
  // INSERT into database the data coming from req.body
 const query = db.query("INSERT INTO notes SET ?", [ req.body ], function (err, results) {
    if(err) throw err;
    res.json(results);
  });
  console.log(query.sql);
});

router.put("/:id", function (req, res) {
  // UPDATE database setting req.body WHERE id = req.params.id
  db.query("UPDATE notes SET ? WHERE id = ?", [req.body, req.params.id], function (err, results) {
    if(err) throw err;
    res.json(results);
  } )
});

router.delete("/:id", function (req, res) {
  // DELETE from database where id = req.params.id
  const query = db.query("DELETE FROM notes WHERE id = ?", [ req.params.id ], function (err, results) {
    if(err) throw err;
    res.json(results);
  })
});

module.exports = router;