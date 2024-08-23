package tn.esprit.stage.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.FormationPredefinie;
import tn.esprit.stage.entities.Phase;
import tn.esprit.stage.repositories.FormationPredefinieRepository;
import tn.esprit.stage.repositories.PhaseRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FormationPredefinieImp implements IServiceFormationPred {

    @Autowired
    private FormationPredefinieRepository formationPredefinieRepository;

    @Autowired
    private PhaseRepository phaseRepository;

    @Override
    public FormationPredefinie createFormationPredefinie(FormationPredefinie formationPredefinie, Integer phaseId) {
        Optional<Phase> phaseOpt = phaseRepository.findById(phaseId);
        if (phaseOpt.isPresent()) {
            formationPredefinie.setPhase(phaseOpt.get());
            return formationPredefinieRepository.save(formationPredefinie);
        }
        throw new RuntimeException("Phase not found with id: " + phaseId);
    }

    @Override
    public FormationPredefinie getFormationPredefinieById(Integer id) {
        return formationPredefinieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FormationPredefinie not found with id: " + id));
    }

    @Override
    public List<FormationPredefinie> getAllFormationPredefinie() {
        return formationPredefinieRepository.findAll();
    }

    @Override
    public FormationPredefinie updateFormationPredefinie(Integer id, FormationPredefinie formationPredefinie) {
        FormationPredefinie existingFormationPredefinie = formationPredefinieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("FormationPredefinie not found with id " + id));

        // Mettez à jour les attributs de l'entité existante
        existingFormationPredefinie.setTypeFormation(formationPredefinie.getTypeFormation());
        existingFormationPredefinie.setPropositionFormateur(formationPredefinie.getPropositionFormateur());
        // Mettez à jour d'autres attributs nécessaires

        return formationPredefinieRepository.save(existingFormationPredefinie);
    }

    @Override
    public void deleteFormationPredefinie(Integer id) {
        if (formationPredefinieRepository.existsById(id)) {
            formationPredefinieRepository.deleteById(id);
        } else {
            throw new RuntimeException("FormationPredefinie not found with id: " + id);
        }
    }

    @Override
    public List<FormationPredefinie> getFormationsPredefiniesByPhase(Integer phaseId) {
        return formationPredefinieRepository.findByPhase_IdPhase(phaseId);
    }

    @Override
    public List<FormationPredefinie> getAllFormationsPredefiniesWithDetails() {
        return formationPredefinieRepository.findAllWithFormationsAndParticipants();
    }

}
