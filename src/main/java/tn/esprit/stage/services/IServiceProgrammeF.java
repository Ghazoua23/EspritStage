package tn.esprit.stage.services;

import tn.esprit.stage.entities.ProgrammeFormation;

import java.util.List;
import java.util.Optional;

public interface IServiceProgrammeF {

    ProgrammeFormation createProgrammeFormation(ProgrammeFormation programmeFormation, int formateurId);

    ProgrammeFormation updateProgrammeFormation(int id, ProgrammeFormation programmeFormation);

    void deleteProgrammeFormation(int id);

    ProgrammeFormation getProgrammeFormationById(int id);

    List<ProgrammeFormation> getAllProgrammeFormations();
}
