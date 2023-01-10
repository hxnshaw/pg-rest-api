const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

//ROUTES

//GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//GET A TODO
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//CREATE A TODO
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//UPDATE A TODO
app.patch("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body; //SET
    const { id } = req.params; //WHERE

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id=$2",
      [description, id]
    );

    res.json("Update Successful");
  } catch (error) {
    console.log(error.message);
  }
});

//DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [
      id,
    ]);
    res.json("Deleted Successfully");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3000, () => {
  console.log(`Server is listening on port 3000 `);
});
