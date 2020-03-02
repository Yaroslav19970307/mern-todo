const {Todo} = require('../models');
const errHendler = require('../untils/errHendler');

const all = async (req, res) => {
    try {
        const user = req.user.id;
        const todos = await Todo.find({ user });
        res.status(200).json(todos);
    }catch (err) {
        errHendler(res, err);
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user.id;
        const todo = await Todo.findById(id);
        res.status(200).json(todo);
    } catch (err) {
        errHendler(res, err);
    }
};

const create = async (req, res) => {
    try {
        const user = req.user.id;
        const {title} = req.body;
        const todo = await new Todo({
            user,
            title
        }).save();
        res.status(201).json(todo);
    }catch (err) {
        errHendler(res, err);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await Todo.remove({_id:id});
        res.status(200).json({message:'todo removed', id});
    } catch (err) {
        errHendler(res, err);
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findByIdAndUpdate(
            {_id:id},
            {$set:req.body},
            {new:true}
        );
        res.status(201).json(todo);
    } catch (err) {
        errHendler(res, err);
    }
};

module.exports = {
    all,
    create,
    getById,
    remove,
    update
};