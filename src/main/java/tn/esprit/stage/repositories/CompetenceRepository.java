package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Competence;

public interface CompetenceRepository extends JpaRepository<Competence,Integer> {
}
