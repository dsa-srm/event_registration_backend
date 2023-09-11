import * as randomString from "randomized-string";

const generateToken =(): string => {  
  const token = randomString.generate({ 
    charset: "alphanumeric",  //alphanumeric
    lowerCaseOnly: true,    //lower case only
    length: 8, //number of characters
  });
  return token;
};

export default generateToken;
