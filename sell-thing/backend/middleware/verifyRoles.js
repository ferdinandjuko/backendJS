const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.auth.roles) res.sendStatus(401);
        const rolesArray = [...allowedRoles];
    }
}