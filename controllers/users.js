const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Пользователь с таким ID не найден.',
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Невалидный id' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Некорректные данные' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) return res.status(404).send({ message: 'Пользователь с таким ID не найден.' });
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Некорректные данные' });
      if (err.name === 'CastError') return res.status(400).send({ message: 'Невалидный id' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) return res.status(404).send({ message: 'Пользователь с таким ID не найден.' });
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Некорректные данные' });
      if (err.name === 'CastError') return res.status(400).send({ message: 'Невалидный id' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateUser,
};
