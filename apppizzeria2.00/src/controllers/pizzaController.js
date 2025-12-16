const Pizza = require("../models/Pizza")

// ==============================
// CREAR PIZZA
// ==============================
exports.create = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body)

    res.status(201).json({
      mensaje: "Pizza creada correctamente",
      data: pizza
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la pizza",
      error: error.message
    })
  }
}

// ==============================
// LISTAR PIZZAS
// ==============================
exports.getAll = async (req, res) => {
  try {
    const pizzas = await Pizza.find()

    res.status(200).json({
      mensaje: "Pizzas obtenidas correctamente",
      total: pizzas.length,
      data: pizzas
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar pizzas",
      error: error.message
    })
  }
}

// ==============================
// ACTUALIZAR PIZZA
// ==============================
exports.update = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!pizza) {
      return res.status(404).json({
        mensaje: "Pizza no encontrada"
      })
    }

    res.status(200).json({
      mensaje: "Pizza actualizada correctamente",
      data: pizza
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la pizza",
      error: error.message
    })
  }
}

// ==============================
// ELIMINAR PIZZA
// ==============================
exports.remove = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id)

    if (!pizza) {
      return res.status(404).json({
        mensaje: "Pizza no encontrada"
      })
    }

    res.status(200).json({
      mensaje: "Pizza eliminada correctamente"
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la pizza",
      error: error.message
    })
  }
}
