package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.EvaluationParticipant;

public interface EvaluationParticipantRepository extends JpaRepository<EvaluationParticipant,Integer> {
}
