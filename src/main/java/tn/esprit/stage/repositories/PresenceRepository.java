package tn.esprit.stage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage.entities.Presence;

import java.util.List;
import java.util.Optional;

public interface PresenceRepository extends JpaRepository<Presence,Integer> {
    List<Presence> findBySeanceIdSeance(Long idSeance);
    Optional<Presence> findBySeanceIdSeanceAndParticipantIdEnseignant(int idSeance, int idParticipant);
}
