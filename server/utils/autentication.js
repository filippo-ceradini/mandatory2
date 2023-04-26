export default function isAuthenticated(req, res, next) {
    if (req.session && req.session.user && req.session.user.email) {
        console.log("birra")
        next();
    } else {
        res.status(401).send('You are not authenticated.');
    }
};