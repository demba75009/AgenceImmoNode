const jwt = require('jsonwebtoken');
const secret = 'a2463421-b798-470a-b4ee-fd23783ec69d';

const createJwtToken = (user) => {
  const jwtToken = jwt.sign({
    sub: user._id
  }, secret);
  return jwtToken;
}