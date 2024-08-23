package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Enseignant;

public interface EnseignantRepository extends JpaRepository<Enseignant,Integer> {
}
