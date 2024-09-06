package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Formation;

import java.util.Date;
import java.util.List;

public interface FormationRepository extends JpaRepository<Formation,Integer> {
    List<Formation> findByDateDebutBeforeAndDateFinAfter(Date dateFin, Date dateDebut);
    // Méthode pour trouver les formations par l'ID du formateur
    List<Formation> findByFormateur_IdEnseignant(Integer formateurId);
}
