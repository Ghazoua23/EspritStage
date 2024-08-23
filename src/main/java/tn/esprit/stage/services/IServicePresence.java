package tn.esprit.stage.services;

import tn.esprit.stage.entities.Enseignant;
import tn.esprit.stage.entities.Presence;
import tn.esprit.stage.entities.Seance;

import java.util.List;

public interface IServicePresence {
    public Presence marquerPresence(Enseignant formateur, Enseignant participant, Seance seance, boolean estPresent);
    public void supprimerPresence(int id);
    public Presence getPresenceById(int id);
    public Presence modifierPresence(int id,Presence presence);
    public List<Presence> getAllPresences();

    public List<Presence> findBySeanceId(Long seanceId);
    public Presence getPresenceBySeanceAndParticipant(int idSeance, int idParticipant);
}
