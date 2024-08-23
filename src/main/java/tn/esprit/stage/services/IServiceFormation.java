package tn.esprit.stage.services;

import tn.esprit.stage.entities.Formation;

import java.util.List;
import java.util.Optional;

public interface IServiceFormation {

    public Formation createFormation(Formation formation, int formateurId, int formationPredefinieId);

    Formation updateFormation(int id, Formation formation);

    void deleteFormation(int id);

    Formation getFormationById(int id);

    List<Formation> getAllFormations();
}
