package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.Enseignant;
import tn.esprit.stage.entities.Formation;
import tn.esprit.stage.entities.Seance;
import tn.esprit.stage.entities.UserApp;
import tn.esprit.stage.repositories.EnseignantRepository;
import tn.esprit.stage.repositories.FormationRepository;
import tn.esprit.stage.repositories.SeanceRepository;
import tn.esprit.stage.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SeanceImp implements IServiceSeance{

    @Autowired
    private SeanceRepository seanceRepository;

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;
    @Override
    public Seance createSeance(Seance seance, int formateurId, int formationId) {
        Enseignant formateur = enseignantRepository.findById(formateurId)
                .orElseThrow(() -> new RuntimeException("Formateur non trouvé"));

        Formation formation = formationRepository.findById(formationId)
                .orElseThrow(() -> new RuntimeException("Formation non trouvée"));

        seance.setFormateur(formateur);
        seance.setFormation(formation);

        return seanceRepository.save(seance);
    }

    @Override
    public Seance updateSeance(int id, Seance seance) {
        Seance existingSeance = seanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Séance non trouvée"));
        existingSeance.setDateDebut(seance.getDateDebut());
        existingSeance.setDateFin(seance.getDateFin());
        existingSeance.setFormation(seance.getFormation());
        existingSeance.setSalle(seance.getSalle());
        existingSeance.setFormateur(seance.getFormateur());
        return seanceRepository.save(existingSeance);
    }

    @Override
    public void deleteSeance(int id) {
        Seance seance = seanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Séance non trouvée"));
        seanceRepository.delete(seance);
    }

    @Override
    public Optional<Seance> getSeanceById(int id) {
        return seanceRepository.findById(id);
    }

    @Override
    public List<Seance> getAllSeances() {
        return seanceRepository.findAll();
    }

    @Override
    public List<Seance> getSeancesByFormationId(int formationId) {
        return seanceRepository.findByFormationId(formationId);
    }
}
