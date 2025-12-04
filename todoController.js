const Todo = require("../models/todoModel");

// Create Todo
exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    const newTodo = new Todo({ text });
    await newTodo.save();

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Todos
exports.getTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();

    res.json({
      success: true,
      count: allTodos.length,
      data: allTodos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    res.json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
