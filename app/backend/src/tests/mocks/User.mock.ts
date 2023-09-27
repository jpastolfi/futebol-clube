export const noUsernameLogin = {
  password: "secret_user", 
};
export const noPasswordLogin = {
  email: "user@user.com",
}

export const validLogin = {
  email: "user@user.com",
  password: "secret_user",
}

export const nonExistentEmail = {
  email: "users@user.com",
  password: "secret_user",
}

export const wrongPassword = {
  email: "user@user.com",
  password: "secret_users",
}

export const validLoginReturn = {
  dataValues: {
    password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO",
  }
}

export const invalidUsernameLogin = {
  email: "invalid",
  password: "secret_user",
}

export const invalidPasswordLogin = {
  email: "user@user.com",
  password: "user",
}

export const modelResponse = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  //secret_user
}
