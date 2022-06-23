const checkName = (displayName) => {
    if (displayName.length < 8) {
        const error = {
            status: 400,
            message: '"displayName" length must be at least 8 characters long',
        };
        throw error;
    }
};

const checkEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
        const error = {
            status: 400,
            message: '"email" must be a valid email',
        };
        throw error;
    }
};

const checkPassword = (password) => {
    if (password.length < 6) {
        const error = {
            status: 400,
            message: '"password" length must be at least 6 characters long',
        };
        throw error;
    }
};

const checkUser = (req, res, next) => {
    const { displayName, email, password } = req.body;

    checkName(displayName);
    checkEmail(email);
    checkPassword(password);
    next();
};

module.exports = checkUser;