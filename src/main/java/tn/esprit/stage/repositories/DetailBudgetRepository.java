package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.DetailBudget;

public interface DetailBudgetRepository extends JpaRepository<DetailBudget,Integer> {
}
