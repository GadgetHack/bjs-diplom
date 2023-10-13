"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response.error) {
      userForm.setRegisterErrorMessage(response.error);
    } else  {
      location.reload();
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.error) {
      alert(response.error);
    } else  {
      location.reload();
    }

  });
}
