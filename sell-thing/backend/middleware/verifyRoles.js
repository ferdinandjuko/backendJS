const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.auth.roles) res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.auth.roles.map(role => role.includes(rolesArray)).find(val => val === true);
        if (!result) res.sendStatus(401); // Unauthorized
        next();
    }
}