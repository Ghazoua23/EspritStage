package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.PeriodeFormation;

public interface PeriodeRepository extends JpaRepository<PeriodeFormation, Integer> {
}
