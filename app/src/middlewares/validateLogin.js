export const validateLogIn = (req, res, next) => {
    console.log(req.session);
    if (req.session.info && req.session.info.loggedIn) next();
    else res.status(404).json({ msg: 'Fuera de aqui, no estas autorizado' });
};