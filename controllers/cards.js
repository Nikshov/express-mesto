const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
    .finally(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Некорректные данные' });
      if (err.name === 'CastError') return res.status(400).send({ message: 'Невалидный id' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    })
    .finally(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: 'Карточка с таким ID не найдена.',
        });
      }
      return res.status(200).send({
        message: 'Карточка была удалена',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Невалидный id' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    })
    .finally(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: 'Карточка с таким ID не найдена.',
        });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Невалидный id' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    })
    .finally(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: 'Карточка с таким ID не найдена.',
        });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(400).send({ message: 'Невалидный id' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    })
    .finally(next);
};

module.exports = {
  dislikeCard,
  likeCard,
  deleteCard,
  createCard,
  getCards,
};
