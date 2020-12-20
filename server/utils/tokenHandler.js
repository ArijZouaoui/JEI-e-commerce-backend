//all the logic below : mohamed achich
const jwt = require("jsonwebtoken");
//create a new access token

/*the mecanism of thetokens used : 
as a mesure of security i've stocked the access tokens in a variable (front-end ) this variable should be sent with every auth request to authenticate the user, the refresh token is stocked in a http only cookie ; 
the refresh token is used to fetch the access token if the user reloads ,leaves and reenters the web site in a period of 7 days ; 
note that if the refresh token is sent to the server to auth the user the server returns an error as the access token is the only auth
i opted for such solution for security reasons as  if you store the access token in a cookie or local storage you are prone to a xss attack 
the solution is inspired from hasura.io devellopers 
*/
exports.createAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, "3f5eKxTGOAgf6AbUiP4qB", {
    expiresIn: "15m",
  });
};

exports.createRefreshToken = (user) => {
  //create a new refresh token

  return jwt.sign(
    { userId: user.id, userName: user.userName },
    "bjqvbvvbjlkqfvuijkrfqv",
    {
      expiresIn: "15m",
    }
  );
};

exports.sendRefreshToken = (res, token) => {
  //send the refresh token as a http only cookie the path is set to '/'
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/",
  });
};
