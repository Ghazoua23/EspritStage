package tn.esprit.stage.services;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.*;
import tn.esprit.stage.repositories.EnseignantRepository;
import tn.esprit.stage.repositories.FormationRepository;
import tn.esprit.stage.repositories.SalleRepository;
import tn.esprit.stage.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SalleImp implements IServiceSalle{

    private SalleRepository salleRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Override
    public Salle addSalle(Salle salle, int enseignantId) {
        Enseignant enseignant = enseignantRepository.findById(enseignantId)
                .orElseThrow(() -> new RuntimeException("Enseignant not found"));

        if (!enseignant.getRole().equals(Role.SERVICE_DSI)) {
            throw new RuntimeException("Unauthorized: Only SERVICE_DSI can add Salle");
        }

        salle.setEnseignant(enseignant);
        return salleRepository.save(salle);
    }

    @Override
    public Salle updateSalle(Salle salle, int idSalle) {
        Salle existingSalle = salleRepository.findById(idSalle)
                .orElseThrow(() -> new RuntimeException("Salle non trouvée"));
        existingSalle.setTypeSalle(salle.getTypeSalle());
        existingSalle.setNbrPlace(salle.getNbrPlace());
        existingSalle.setEquipements(salle.getEquipements());
        existingSalle.setProjection(salle.getProjection());
        existingSalle.setDispoClima(salle.getDispoClima());
        return salleRepository.save(existingSalle);
    }

    @Override
    public void deleteSalle(int salleId) {
        salleRepository.deleteById(salleId);
    }

    @Override
    public Salle getSalleById(int salleId) {
        return salleRepository.findById(salleId)
                .orElseThrow(() -> new RuntimeException("Salle not found"));
    }

    @Override
    public List<Salle> getAllSalles() {
        return salleRepository.findAll();
    }

    @Override
    public List<Salle> getAvailableSalles(LocalDateTime dateDebut, LocalDateTime dateFin) {
        return salleRepository.findAvailableSalles(dateDebut, dateFin);
    }
}
