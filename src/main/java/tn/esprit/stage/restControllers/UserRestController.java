package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.UserApp;
import tn.esprit.stage.services.IServiceUser;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private IServiceUser iServiceUser;

    @GetMapping
    public List<UserApp> getAllUsers() {
        return iServiceUser.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserApp> getUserById(@PathVariable int id) {
        Optional<UserApp> optionalUser = iServiceUser.getUserById(id);
        if (optionalUser.isPresent()) {
            return ResponseEntity.ok(optionalUser.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public UserApp createUser(@RequestBody UserApp user) {
        return iServiceUser.createUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserApp> updateUser(@PathVariable int id, @RequestBody UserApp userDetails) {
        UserApp updatedUser = iServiceUser.updateUser(id, userDetails);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        iServiceUser.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
