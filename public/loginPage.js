"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response.error) {
      userForm.setLoginErrorMessage(response.error);
    } else  {
      location.reload();
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.error) {
      userForm.setRegisterErrorMessage(response.error);
    } else  {
      location.reload();
    }

  });
}
