package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.EvaluationFormation;

public interface EvaluationFormationRepository extends JpaRepository<EvaluationFormation,Integer> {
}
