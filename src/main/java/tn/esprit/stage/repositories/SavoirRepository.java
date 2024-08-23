package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Savoir;

public interface SavoirRepository extends JpaRepository<Savoir,Integer> {
}
