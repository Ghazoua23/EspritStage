package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.stage.entities.Salle;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface SalleRepository extends JpaRepository<Salle,Integer> {
    // Trouver les salles disponibles en utilisant une méthode personnalisée
    @Query("SELECT s FROM Salle s WHERE s.idSalle NOT IN (" +
            "SELECT se.salle.idSalle FROM Seance se WHERE " +
            "(se.dateDebut <= :dateFin AND se.dateFin >= :dateDebut))")
    List<Salle> findAvailableSalles(@Param("dateDebut") LocalDateTime dateDebut,
                                    @Param("dateFin") LocalDateTime dateFin);
}
