package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Niveau;

public interface NiveauRepository extends JpaRepository<Niveau,Integer> {
}
