package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.ProgrammeFormation;

public interface ProgrammeFormationRepository extends JpaRepository<ProgrammeFormation,Integer> {
}
