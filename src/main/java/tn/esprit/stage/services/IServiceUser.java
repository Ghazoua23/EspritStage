package tn.esprit.stage.services;


import tn.esprit.stage.entities.UserApp;

import java.util.List;
import java.util.Optional;

public interface IServiceUser {
    public List<UserApp> getAllUsers();
    public Optional<UserApp> getUserById(int id);
    public UserApp createUser(UserApp user);
    public UserApp updateUser(int id, UserApp userDetails);
    public void deleteUser(int id);
}
