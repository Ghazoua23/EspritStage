package tn.esprit.stage.services;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.Enseignant;
import tn.esprit.stage.entities.Formation;
import tn.esprit.stage.entities.FormationPredefinie;
import tn.esprit.stage.repositories.EnseignantRepository;
import tn.esprit.stage.repositories.FormationPredefinieRepository;
import tn.esprit.stage.repositories.FormationRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FormationImp implements IServiceFormation{

    private FormationRepository formationRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Autowired
    private FormationPredefinieRepository formationPredefinieRepository;

    @Override
    public Formation createFormation(Formation formation,int formateurId, int formationPredefinieId) {
        // Assurez-vous que la formation n'est pas déjà dans la base de données
        if (formation.getId() != null && formationRepository.existsById(formation.getId())) {
            throw new EntityExistsException("La formation existe déjà");
        }

        // Sauvegardez la nouvelle formation
        return formationRepository.save(formation);
    }

    @Override
    public Formation updateFormation(int id, Formation formation) {
        Formation existingFormation = formationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formation not found"));

        // Update fields as needed
        existingFormation.setType(formation.getType());
        existingFormation.setEtat(formation.getEtat());
        existingFormation.setResponsableFormation(formation.getResponsableFormation());
        existingFormation.setOrganismeFormation(formation.getOrganismeFormation());
        existingFormation.setCout(formation.getCout());
        existingFormation.setDateDebut(formation.getDateDebut());
        existingFormation.setDateFin(formation.getDateFin());
        existingFormation.setFormationPred(formation.getFormationPred());
        existingFormation.setPeriodeFormation(formation.getPeriodeFormation());
        existingFormation.setSeances(formation.getSeances());
        existingFormation.setEvaluationFormations(formation.getEvaluationFormations());
        existingFormation.setEvaluationParticipants(formation.getEvaluationParticipants());
        existingFormation.setBesoinFormations(formation.getBesoinFormations());
        existingFormation.setCompetences(formation.getCompetences());
        existingFormation.setFormateur(formation.getFormateur());
        existingFormation.setParticipants(formation.getParticipants());

        return formationRepository.save(existingFormation);
    }

    @Override
    public void deleteFormation(int id) {
        formationRepository.deleteById(id);
    }

    @Override
    public Formation getFormationById(int id) {
        return formationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formation not found"));
    }

    @Override
    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }


}
