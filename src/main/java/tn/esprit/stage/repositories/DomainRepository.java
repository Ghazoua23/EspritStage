package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Domain;

public interface DomainRepository extends JpaRepository<Domain, Integer> {
}
