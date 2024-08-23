package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.stage.entities.Enseignant;
import tn.esprit.stage.entities.Formation;
import tn.esprit.stage.entities.Presence;
import tn.esprit.stage.entities.Seance;
import tn.esprit.stage.repositories.EnseignantRepository;
import tn.esprit.stage.repositories.PresenceRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PresenceImp implements IServicePresence{


    @Autowired
    private PresenceRepository presenceRepository;

    private EnseignantRepository enseignantRepository;

    @Override
    public Presence marquerPresence(Enseignant formateur, Enseignant participant, Seance seance, boolean present) {
        Presence presence = new Presence();
        presence.setFormateur(formateur);
        presence.setParticipant(participant);
        presence.setSeance(seance);
        presence.setPresent(present);
        return presenceRepository.save(presence);
    }

    @Override
    public void supprimerPresence(int id) {
        presenceRepository.deleteById(id);
    }

    @Override
    public Presence getPresenceById(int id) {
        return presenceRepository.findById(id).orElseThrow(() -> new RuntimeException("Presence not found"));
    }

    @Override
    public Presence modifierPresence(int id,Presence presence) {
        return presenceRepository.save(presence);
    }

    @Override
    public List<Presence> getAllPresences() {
        return presenceRepository.findAll();
    }

    @Override
    public List<Presence> findBySeanceId(Long seanceId) {
        return presenceRepository.findBySeanceIdSeance(seanceId);
    }

    @Override
    public Presence getPresenceBySeanceAndParticipant(int idSeance, int idParticipant) {
        Optional<Presence> presence = presenceRepository.findBySeanceIdSeanceAndParticipantIdEnseignant(idSeance, idParticipant);
        return presence.orElse(null); // Vous pouvez gérer le cas où la présence n'est pas trouvée
    }

}
