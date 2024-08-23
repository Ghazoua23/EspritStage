package tn.esprit.stage.restControllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.Enseignant;
import tn.esprit.stage.entities.Formation;
import tn.esprit.stage.entities.FormationPredefinie;
import tn.esprit.stage.entities.UserApp;
import tn.esprit.stage.repositories.EnseignantRepository;
import tn.esprit.stage.repositories.FormationPredefinieRepository;
import tn.esprit.stage.repositories.SalleRepository;
import tn.esprit.stage.repositories.UserRepository;
import tn.esprit.stage.services.IServiceFormation;

import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@AllArgsConstructor
@RequestMapping("/api/formations")
@CrossOrigin(origins = "http://localhost:3000")
public class FormationRsetController {

    private static final Logger logger = LoggerFactory.getLogger(FormationRsetController.class);

    @Autowired
    private IServiceFormation formationService;

    private EnseignantRepository enseignantRepository;

    private FormationPredefinieRepository formationPredefinieRepository;


    @PostMapping("/add/{formateurId}/{formationPredefinieId}")
    public ResponseEntity<Formation> createFormation(
            @RequestBody Formation formationRequest,
            @PathVariable int formateurId,
            @PathVariable int formationPredefinieId) {

        // Vérification des données de la requête
        if (formationRequest == null || formationRequest.getParticipants() == null || formationPredefinieId <= 0 || formateurId <= 0) {
            System.out.println("Participants : " + formationRequest.getParticipants());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Récupération des entités
        FormationPredefinie formationPredefinie = formationPredefinieRepository.findById(formationPredefinieId)
                .orElseThrow(() -> new RuntimeException("Formation pré-définie non trouvée"));

        Enseignant formateur = enseignantRepository.findById(formateurId)
                .orElseThrow(() -> new RuntimeException("Formateur non trouvé"));

        // Convertir les IDs des participants en objets Enseignant
        Set<Enseignant> participants = new HashSet<>();
        for (Enseignant participant : formationRequest.getParticipants()) {
            Enseignant enseignant = enseignantRepository.findById(participant.getIdEnseignant())
                    .orElseThrow(() -> new RuntimeException("Participant non trouvé avec l'ID " + participant.getIdEnseignant()));
            participants.add(enseignant);
        }
        formationRequest.setParticipants(participants);

        // Préparer l'objet Formation
        formationRequest.setFormationPredefinie(formationPredefinie);
        formationRequest.setFormateur(formateur);


        // Les participants ont déjà été désérialisés correctement
        // Sauvegarde de la formation
        Formation createdFormation = formationService.createFormation(formationRequest, formateurId, formationPredefinieId);

        return new ResponseEntity<>(createdFormation, HttpStatus.CREATED);
    }




    @PutMapping("/{id}")
    public ResponseEntity<Formation> updateFormation(@PathVariable int id, @RequestBody Formation formation) {
        Formation updatedFormation = formationService.updateFormation(id, formation);
        return new ResponseEntity<>(updatedFormation, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable int id) {
        formationService.deleteFormation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable int id) {
        Formation formation = formationService.getFormationById(id);
        return new ResponseEntity<>(formation, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Formation>> getAllFormations() {
        List<Formation> formations = formationService.getAllFormations();
        return new ResponseEntity<>(formations, HttpStatus.OK);
    }

}
