export const noUsernameLogin = {
  password: "secret_user", 
};
export const noPasswordLogin = {
  username: "user@user.com",
}

export const validLogin = {
  username: "user@user.com",
  password: "secret_user",
}

export const validLoginReturn = {
  dataValues: {
    password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO",
  }
}

export const invalidUsernameLogin = {
  username: "invalid",
  password: "secret_user",
}

export const invalidPasswordLogin = {
  username: "user@user.com",
  password: "user", 
}

export const nonExistentUsernameLogin = {}
export const nonExistentPasswordLogin = {}