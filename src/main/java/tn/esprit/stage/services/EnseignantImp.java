package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.Enseignant;
import tn.esprit.stage.repositories.EnseignantRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EnseignantImp implements IServiceEnseignant{

    @Autowired
    private EnseignantRepository enseignantRepository;

    @Override
    public Enseignant createEnseignant(Enseignant enseignant) {
        return enseignantRepository.save(enseignant);
    }

    @Override
    public Optional<Enseignant> getEnseignantById(Integer id) {
        return enseignantRepository.findById(id);
    }

    @Override
    public Enseignant updateEnseignant(Integer id, Enseignant enseignant) {
        if (enseignantRepository.existsById(id)) {
            enseignant.setIdEnseignant(id);
            return enseignantRepository.save(enseignant);
        }
        throw new RuntimeException("Enseignant not found with id: " + id);
    }

    @Override
    public void deleteEnseignant(Integer id) {
        if (enseignantRepository.existsById(id)) {
            enseignantRepository.deleteById(id);
        } else {
            throw new RuntimeException("Enseignant not found with id: " + id);
        }
    }

    @Override
    public List<Enseignant> getAllEnseignants() {
        return enseignantRepository.findAll();
    }
}
