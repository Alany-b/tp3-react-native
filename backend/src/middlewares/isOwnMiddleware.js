export const isOwner = (Model) => {
  return async (req, res, next) => {
    try {
      const element = await Model.findById(req.params.id);

      if (!element) {
        return res
          .status(404)
          .json({ ok: false, msg: "No se encuentra la publicacion" });
      }

      if (!element.author || element.author.toString() !== req.user.id) {
        return res.status(403).json({ ok: false, msg: "inautorizado" });
      }

      req.element = element;
      next();
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ ok: false, msg: "Error interno del servidor" });
    }
  };
};
