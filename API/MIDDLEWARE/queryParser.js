module.exports = function queryParser(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const q = req.query.q || ''; // término de búsqueda

    req.paginacion = { page, limit, q };
    next();
};
