package tn.esprit.stage.services;

import tn.esprit.stage.entities.Enseignant;

import java.util.List;
import java.util.Optional;

public interface IServiceEnseignant {

    Enseignant createEnseignant(Enseignant enseignant);
    Optional<Enseignant> getEnseignantById(Integer id);
    Enseignant updateEnseignant(Integer id, Enseignant enseignant);
    void deleteEnseignant(Integer id);
    List<Enseignant> getAllEnseignants();
}
