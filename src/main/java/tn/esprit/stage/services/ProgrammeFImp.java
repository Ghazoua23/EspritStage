package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import tn.esprit.stage.entities.*;
import tn.esprit.stage.repositories.EnseignantRepository;
import tn.esprit.stage.repositories.ProgrammeFormationRepository;
import tn.esprit.stage.repositories.UserRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProgrammeFImp implements IServiceProgrammeF{

    private ProgrammeFormationRepository programmeFormationRepositoryy;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Override
    public ProgrammeFormation createProgrammeFormation(ProgrammeFormation programmeFormation, int formateurId) {
        Enseignant formateur = enseignantRepository.findById(formateurId)
                .orElseThrow(() -> new RuntimeException("Formateur not found"));

        programmeFormation.setFormateur(formateur);
        return programmeFormationRepositoryy.save(programmeFormation);
    }

    @Override
    public ProgrammeFormation updateProgrammeFormation(int id, ProgrammeFormation programmeFormation) {
        ProgrammeFormation existingProgrammeFormation = programmeFormationRepositoryy.findById(id)
                .orElseThrow(() -> new RuntimeException("ProgrammeFormation not found"));

        existingProgrammeFormation.setNomProgramme(programmeFormation.getNomProgramme());
        existingProgrammeFormation.setPhases(programmeFormation.getPhases());
        existingProgrammeFormation.setFormateur(programmeFormation.getFormateur());

        return programmeFormationRepositoryy.save(existingProgrammeFormation);
    }

    @Override
    public void deleteProgrammeFormation(int id) {
        programmeFormationRepositoryy.deleteById(id);
    }

    @Override
    public ProgrammeFormation getProgrammeFormationById(int id) {
        return programmeFormationRepositoryy.findById(id)
                .orElseThrow(() -> new RuntimeException("ProgrammeFormation not found"));
    }

    @Override
    public List<ProgrammeFormation> getAllProgrammeFormations() {
        return programmeFormationRepositoryy.findAll();
    }

}
