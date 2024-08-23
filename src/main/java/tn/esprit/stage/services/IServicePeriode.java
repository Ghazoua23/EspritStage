package tn.esprit.stage.services;

import tn.esprit.stage.entities.PeriodeFormation;

import java.util.List;
import java.util.Optional;

public interface IServicePeriode {
    PeriodeFormation ajouterPeriodeFormation(PeriodeFormation periodeFormation);

    Optional<PeriodeFormation> getPeriodeFormationById(int id);

    List<PeriodeFormation> getAllPeriodesFormation();

    PeriodeFormation updatePeriodeFormation(int id, PeriodeFormation updatedPeriodeFormation);

    void deletePeriodeFormation(int id);


}
