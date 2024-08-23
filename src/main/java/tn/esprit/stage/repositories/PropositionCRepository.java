package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.PropositionCompetence;

public interface PropositionCRepository extends JpaRepository<PropositionCompetence,Integer> {
}
