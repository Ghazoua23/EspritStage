package tn.esprit.stage.services;

import tn.esprit.stage.entities.Phase;

import java.util.List;
import java.util.Optional;

public interface IServicePhase {
    Phase createPhase(Phase phase, int programmeFormationId, int formateurId);

    Phase updatePhase(int id, Phase phase);

    void deletePhase(int id);

    Phase getPhaseById(int id);

    List<Phase> getAllPhases();

    List<Phase> getPhasesByProgrammeFormation(int programmeFormationId);
}
