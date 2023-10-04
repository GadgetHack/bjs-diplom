"use strict"
const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response.error) {
      alert(response.error);
    } else if (response.success) {
      location.reload();
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.error) {
      alert(response.error);
    } else if (response.success) {
      location.reload();
    }

  });
}

