package tn.esprit.stage.services;

import tn.esprit.stage.entities.Seance;

import java.util.List;
import java.util.Optional;

public interface IServiceSeance {
    Seance createSeance(Seance seance, int formateurId,int formationId);
    Optional<Seance> getSeanceById(int id);
    List<Seance> getAllSeances();
    Seance updateSeance(int id, Seance seance);
    void deleteSeance(int id);

    List<Seance> getSeancesByFormationId(int formationId);
}
