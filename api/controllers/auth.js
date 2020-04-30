/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  if (!password || !username) return res.status(400).send({ auth: false, token: null });

  const token = jwt.sign({ username }, process.env.secret, {
    expiresIn: 86400, // expires in 24 hours
  });
  res.status(200).send({ auth: true, token, username });
};
