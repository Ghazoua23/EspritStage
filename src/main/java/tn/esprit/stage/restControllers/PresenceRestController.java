package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.Enseignant;
import tn.esprit.stage.entities.Presence;
import tn.esprit.stage.entities.Seance;
import tn.esprit.stage.services.IServiceEnseignant;
import tn.esprit.stage.services.IServicePresence;
import tn.esprit.stage.services.IServiceSeance;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/presences")
@CrossOrigin(origins = "http://localhost:3000")
public class PresenceRestController {

    @Autowired
    private IServicePresence presenceService;

    @Autowired
    private IServiceSeance seanceService;

    @Autowired
    private IServiceEnseignant enseignantService;


    @PostMapping("/marquer/{formateurId}/{seanceId}")
    public ResponseEntity<?> marquerPresences(@PathVariable Integer formateurId, @PathVariable Integer seanceId,
                                              @RequestBody Map<Integer, Boolean> presences) {
        Enseignant formateur = enseignantService.getEnseignantById(formateurId)
                .orElseThrow(() -> new IllegalArgumentException("Formateur non trouvé avec ID : " + formateurId));
        Seance seance = seanceService.getSeanceById(seanceId)
                .orElseThrow(() -> new IllegalArgumentException("Séance non trouvée avec ID : " + seanceId));

        for (Map.Entry<Integer, Boolean> entry : presences.entrySet()) {
            Integer participantId = entry.getKey();
            Boolean present = entry.getValue();

            if (participantId == null || present == null) {
                throw new IllegalArgumentException("L'ID du participant ou la valeur de présence ne peut pas être null");
            }

            Enseignant participant = enseignantService.getEnseignantById(participantId)
                    .orElseThrow(() -> new RuntimeException("Participant non trouvé avec l'ID " + participantId));

            presenceService.marquerPresence(formateur, participant, seance, present);
        }

        return ResponseEntity.ok().build();
    }



    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<Void> supprimerPresence(@PathVariable int id) {
        presenceService.supprimerPresence(id);
        return ResponseEntity.noContent().build(); // Renvoie un code 204 No Content
    }

    @PutMapping("/modifier/{id}")
    public ResponseEntity<Presence> modifierPresence(
            @PathVariable int id,
            @RequestBody Map<String, Boolean> body) {

        Presence presenceExistante = presenceService.getPresenceById(id);
        boolean presenceStatus = body.getOrDefault("present", false);  // Changement ici

        presenceExistante.setPresent(presenceStatus);

        Presence updatedPresence = presenceService.modifierPresence(id, presenceExistante);
        return ResponseEntity.ok(updatedPresence);
    }




    @GetMapping("/afficher/{id}")
    public ResponseEntity<Presence> afficherPresenceParId(@PathVariable int id) {
        Presence presence = presenceService.getPresenceById(id);
        return ResponseEntity.ok(presence);
    }


    @GetMapping("/afficher")
    public ResponseEntity<List<Presence>> afficherToutesLesPresences() {
        List<Presence> presences = presenceService.getAllPresences();
        return ResponseEntity.ok(presences);
    }

    @GetMapping("/seance/{seanceId}")
    public ResponseEntity<List<Presence>> getPresencesBySeance(@PathVariable Long seanceId) {
        List<Presence> presences = presenceService.findBySeanceId(seanceId);
        return ResponseEntity.ok(presences);
    }

    @GetMapping("/{idSeance}/{idParticipant}")
    public ResponseEntity<Presence> getPresenceBySeanceAndParticipant(@PathVariable int idSeance, @PathVariable int idParticipant) {
        Presence presence = presenceService.getPresenceBySeanceAndParticipant(idSeance, idParticipant);
        if (presence != null) {
            return ResponseEntity.ok(presence);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
