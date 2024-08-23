package tn.esprit.stage.repositories;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Seance;

import java.util.List;

public interface SeanceRepository extends JpaRepository<Seance, Integer> {
    List<Seance> findByFormationId(int formationId);
}
