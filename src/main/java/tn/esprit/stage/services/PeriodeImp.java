package tn.esprit.stage.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.PeriodeFormation;
import tn.esprit.stage.repositories.PeriodeRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PeriodeImp implements IServicePeriode{

    @Autowired
    private PeriodeRepository periodeRepository;
    @Override
    public PeriodeFormation ajouterPeriodeFormation(PeriodeFormation periodeFormation) {
        return periodeRepository.save(periodeFormation);
    }

    @Override
    public Optional<PeriodeFormation> getPeriodeFormationById(int id) {
        return periodeRepository.findById(id);
    }

    @Override
    public List<PeriodeFormation> getAllPeriodesFormation() {
        return periodeRepository.findAll();
    }

    @Override
    public PeriodeFormation updatePeriodeFormation(int id, PeriodeFormation updatedPeriodeFormation) {
        return periodeRepository.findById(id)
                .map(existingPeriodeFormation -> {
                    existingPeriodeFormation.setNomPeriode(updatedPeriodeFormation.getNomPeriode());

                    // Vérifiez si la collection est nulle et initialisez-la si nécessaire
                    if (updatedPeriodeFormation.getFormations() != null) {
                        existingPeriodeFormation.getFormations().clear();
                        existingPeriodeFormation.getFormations().addAll(updatedPeriodeFormation.getFormations());
                    } else {
                        // Si la collection est nulle, vous pouvez choisir de la laisser inchangée ou initialiser une nouvelle collection
                        existingPeriodeFormation.getFormations().clear(); // ou ne rien faire
                    }

                    return periodeRepository.save(existingPeriodeFormation);
                })
                .orElse(null); // Retourne null si l'entité n'est pas trouvée
    }

    @Override
    public void deletePeriodeFormation(int id) {
        if (periodeRepository.existsById(id)) {
            periodeRepository.deleteById(id);
        }
    }
}
