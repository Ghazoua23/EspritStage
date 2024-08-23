package tn.esprit.stage.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.*;
import tn.esprit.stage.repositories.EnseignantRepository;
import tn.esprit.stage.repositories.PhaseRepository;
import tn.esprit.stage.repositories.ProgrammeFormationRepository;
import tn.esprit.stage.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PhaseImp implements IServicePhase {

    @Autowired
    private PhaseRepository phaseRepository;

    @Autowired
    private ProgrammeFormationRepository programmeFormationRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Override
    public Phase createPhase(Phase phase, int programmeFormationId, int formateurId) {
        ProgrammeFormation programmeFormation = programmeFormationRepository.findById(programmeFormationId)
                .orElseThrow(() -> new RuntimeException("ProgrammeFormation not found"));
        Enseignant formateur = enseignantRepository.findById(formateurId)
                .orElseThrow(() -> new RuntimeException("Enseignant not found"));

        phase.setProgrammeFormation(programmeFormation);
        phase.setFormateur(formateur);
        return phaseRepository.save(phase);
    }

    @Override
    public Phase updatePhase(int id, Phase phase) {
        Phase existingPhase = phaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phase not found"));

        existingPhase.setNomPhase(phase.getNomPhase());
        existingPhase.setDescription(phase.getDescription());

        return phaseRepository.save(existingPhase);
    }

    @Override
    public void deletePhase(int id) {
        phaseRepository.deleteById(id);
    }

    @Override
    public Phase getPhaseById(int id) {
        return phaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phase not found"));
    }

    @Override
    public List<Phase> getAllPhases() {
        return phaseRepository.findAll();
    }

    @Override
    public List<Phase> getPhasesByProgrammeFormation(int programmeFormationId) {
        return phaseRepository.findByProgrammeFormationId(programmeFormationId);
    }
}
