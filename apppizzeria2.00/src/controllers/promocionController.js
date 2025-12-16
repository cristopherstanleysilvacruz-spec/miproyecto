const Promocion = require("../models/Promocion")

// ==============================
// CREAR PROMOCIÓN
// ==============================
exports.create = async (req, res) => {
  try {
    const promocion = await Promocion.create(req.body)

    res.status(201).json({
      mensaje: "Promoción creada correctamente",
      data: promocion
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la promoción",
      error: error.message
    })
  }
}

// ==============================
// LISTAR PROMOCIONES ACTIVAS
// ==============================
exports.getAll = async (req, res) => {
  try {
    const promociones = await Promocion.find({ activo: true })

    res.status(200).json({
      mensaje: "Promociones obtenidas correctamente",
      total: promociones.length,
      data: promociones
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar promociones",
      error: error.message
    })
  }
}

// ==============================
// ACTUALIZAR PROMOCIÓN
// ==============================
exports.update = async (req, res) => {
  try {
    const promocion = await Promocion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!promocion) {
      return res.status(404).json({
        mensaje: "Promoción no encontrada"
      })
    }

    res.status(200).json({
      mensaje: "Promoción actualizada correctamente",
      data: promocion
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la promoción",
      error: error.message
    })
  }
}

// ==============================
// ELIMINAR PROMOCIÓN
// ==============================
exports.remove = async (req, res) => {
  try {
    const promocion = await Promocion.findByIdAndDelete(req.params.id)

    if (!promocion) {
      return res.status(404).json({
        mensaje: "Promoción no encontrada"
      })
    }

    res.status(200).json({
      mensaje: "Promoción eliminada correctamente"
    })
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la promoción",
      error: error.message
    })
  }
}
