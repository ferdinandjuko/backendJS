const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.auth?.roles) res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const userRoles = Object.values(req.auth.roles);
        const result = userRoles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) res.sendStatus(401); // Unauthorized
        next();
    }
}

module.exports = verifyRoles;