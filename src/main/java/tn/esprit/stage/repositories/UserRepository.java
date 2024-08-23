package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.UserApp;

public interface UserRepository extends JpaRepository<UserApp, Integer> {
}
