const logoutButton = new LogoutButton();

logoutButton.action = () =>{
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    } else {
      alert(response.error);
      console.error('Ошибка при разлогинивании', response.error);
    }
  });
}

ApiConnector.current((response) => {
  if (response.success){
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();

function updateExchangeRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } // else (response.error) {
      
    // }
  });

  setTimeout(updateExchangeRates, 60000);
}

updateExchangeRates();

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); 
      moneyManager.setMessage(true, `Баланс успешно пополнен на ${data.amount} ${data.currency}`);
    } else {
      moneyManager.setMessage(false, `Ошибка при пополнении баланса: ${response.error}`);
    }
  });
};
  
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); 
      moneyManager.setMessage(true, `Конвертация успешно выполнена`);
    } else {
      moneyManager.setMessage(false, `Ошибка при конвертации: ${response.error}`);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data); 
      moneyManager.setMessage(true, `Перевод успешно выполнен`);
    } else {
      moneyManager.setMessage(false, `Ошибка при переводе: ${response.error}`);
    }
  });
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if(response.success){
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data,(response) => {
    if(response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, `Пользователь успешно добавлен в избранное`);
    } else {
      favoritesWidget.setMessage(false, `Ошибка при добавлении пользователя в избранное: ${response.error}`);
    }
  });
};

favoritesWidget.removeUserCallback = (userId) => {
  ApiConnector.removeUserFromFavorites(userId, (response) =>{
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, 'Пользователь успешно удален из избранного');
    } else {
      favoritesWidget.setMessage(false, `Ошибка при удалении пользователя из избранного: ${response.error}`);
    }
  });

};