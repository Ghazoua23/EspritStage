package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.stage.entities.FormationPredefinie;

import java.util.List;

public interface FormationPredefinieRepository extends JpaRepository<FormationPredefinie,Integer> {
    List<FormationPredefinie> findByPhase_IdPhase(Integer phaseId);
    @Query("SELECT f FROM FormationPredefinie f LEFT JOIN FETCH f.formations fs LEFT JOIN FETCH fs.participants")
    List<FormationPredefinie> findAllWithFormationsAndParticipants();
}
