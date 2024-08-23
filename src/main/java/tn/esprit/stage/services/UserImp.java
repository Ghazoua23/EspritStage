package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.UserApp;
import tn.esprit.stage.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
public class UserImp implements IServiceUser{

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserApp> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<UserApp> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public UserApp createUser(UserApp user) {
        return userRepository.save(user);
    }

    @Override
    public UserApp updateUser(int id, UserApp userDetails) {
        Optional<UserApp> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserApp user = optionalUser.get();
            user.setUserName(userDetails.getUserName());
            user.setPassword(userDetails.getPassword());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        }
        return null; // or throw an exception
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
