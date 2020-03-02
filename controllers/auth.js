const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
const key = require('../config/keys');
const {User} = require('../models');
const errHendler = require('../untils/errHendler');

const login = async (req, res) => {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
        // user is  req user.password
        const passwordRes = bcrypt.compareSync(password, candidate.password);
        if (passwordRes) {
            //    generate token  pass is cons
            const token = jwr.sign({
                email: candidate.email,
                userId: candidate._id
            }, key.jwtSecret, { expiresIn: 60 * 60 });
            res.status(200).send({token: `Bearer ${token}` });
        } else {
            res.status(401).send({ status: "fail", message: 'password is not consist' });
        }
    } else {
        // user not found
        res.status(404).send({ status: "fail", message: 'email not found' });
    }

};

const register = async (req, res) => {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
        // user is
        res.status(409).send({
            status: 'fail',
            message: 'email is alredy consist'
        });
    } else {
        // not user
        const salt = bcrypt.genSaltSync(10);
        const user = new User({ email, password: bcrypt.hashSync(password, salt) });
        try {
            user.save(async (err, user) => {
                if (err) {
                    res.status(409).send({ status: "fail", err });
                } else {
                    res.status(201).send({ user });
                }
            })
        } catch (err) {
            // res.status(409).send({ status: "fail", err });
            errHendler(res, err);


        }

    }

};

const users = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch (err) {
        errHendler(res, err);
    }
};

module.exports = {
    login,
    register,
    users
};