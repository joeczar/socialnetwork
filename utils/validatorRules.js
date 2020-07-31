const { check, validationResult } = require("express-validator");
const passwordValidation = () => {
    return [
        check("newPwd")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long."),
    ];
};

const registerValidate = () => {
    return [
        check("first")
            .isLength({ min: 1 })
            .isAlpha()
            .withMessage("That name doesn't work.")
            .custom((name) => {
                console.log(name.toLowerCase());
                return name.toLowerCase() !== "undefined";
            })
            .withMessage("Undefined is for Funky 🐔🐔")
            .exists(),
        check("last")
            .isLength({ min: 1 })
            .isAlpha()
            .withMessage("That name doesn't work.")
            .custom((name) => {
                console.log(name.toLowerCase());
                return name.toLowerCase() !== "undefined";
            })
            .withMessage("Undefined is for Funky 🐔🐔")
            .exists(),
        check("email")
            .normalizeEmail()
            .isEmail()
            .withMessage("Must be a valid email.")
            .exists(),
        check("pass")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long.")
            .exists(),
    ];
};
const profileValidate = () => {
    return [
        check("url")
            .optional({ nullable: true, checkFalsy: true })
            .isURL()
            .withMessage("Must be a valid URL."),
        check("city")
            .optional({ nullable: true, checkFalsy: true })
            .isLength({ min: 3, max: 25 })
            .withMessage("Are you sure you don't want to enter a City?")
            .withMessage("City can only contain letters."),
        check("age")
            .optional({ nullable: true, checkFalsy: true })
            .isNumeric()
            .withMessage("Age must be a number"),
    ];
};
const editProfileValidate = () => {
    return [
        check("first")
            .optional({ nullable: true, checkFalsy: true })
            .isLength({ min: 1 })
            .isAlpha()
            .withMessage("First name can only contain letters."),
        check("last")
            .optional({ nullable: true, checkFalsy: true })
            .isLength({ min: 1 })
            .isAlpha()
            .withMessage("Last name can only contain letters."),
        check("email")
            .isEmail()
            .withMessage("Must be a valid email.")
            .optional({ nullable: true, checkFalsy: true }),
        check("homepage")
            .optional({ nullable: true, checkFalsy: true })
            .isURL()
            .withMessage("Must be a valid URL."),
        check("city")
            .optional({ nullable: true, checkFalsy: true })
            .isLength({ min: 1 })
            .withMessage("Are you sure you don't want to enter a City?"),
        // .isAlpha()
        // .withMessage('City can only contain letters.'),
        check("age")
            .optional({ nullable: true, checkFalsy: true })
            .isNumeric()
            .withMessage("Age must be a number"),
    ];
};
const loginValidate = () => {
    return [
        check("email")
            .isEmail()
            .withMessage("Must be a valid email.")
            .exists()
            .withMessage("You must enter an Email."),
        check("pass")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long.")
            .exists()
            .withMessage("You must enter a password."),
    ];
};

const validate = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        const err = errors.array().map((err) => err.msg);
        return err;
    } else {
        return [];
    }
};

module.exports = {
    passwordValidation,
    registerValidate,
    profileValidate,
    editProfileValidate,
    loginValidate,
    validate,
};
