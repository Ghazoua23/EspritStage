package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Phase;

import java.util.List;

public interface PhaseRepository extends JpaRepository<Phase, Integer> {
    List<Phase> findByProgrammeFormationId(int programmeFormationId);
}
