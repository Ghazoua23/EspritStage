package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.Formation;
import tn.esprit.stage.entities.Seance;
import tn.esprit.stage.repositories.FormationRepository;
import tn.esprit.stage.services.IServiceSeance;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/seances")
@CrossOrigin(origins = "http://localhost:3000")
public class SeanceRestController {

    @Autowired
    private IServiceSeance seanceService;

    @Autowired
    private FormationRepository formationRepository;

    @PostMapping("/add/{formateurId}/{formationId}")
    public ResponseEntity<Seance> createSeance(@RequestBody Seance seance,
                                            @PathVariable int formateurId,
                                            @PathVariable int formationId) {
        Seance createdSeance = seanceService.createSeance(seance,formateurId,formationId);
        return new ResponseEntity<>(createdSeance, HttpStatus.CREATED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seance> updateSeance(@PathVariable int id, @RequestBody Seance seance) {
        Seance updatedSeance = seanceService.updateSeance(id, seance);
        return new ResponseEntity<>(updatedSeance, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeance(@PathVariable int id) {
        seanceService.deleteSeance(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seance> getSeanceById(@PathVariable int id) {
        Seance seance = seanceService.getSeanceById(id)
                .orElseThrow(() -> new RuntimeException("Séance non trouvée avec l'ID : " + id));
        return new ResponseEntity<>(seance, HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<Seance>> getAllSeances() {
        List<Seance> seances = seanceService.getAllSeances();
        return new ResponseEntity<>(seances, HttpStatus.OK);
    }

    @GetMapping("/formation/{formationId}")
    public List<Seance> getSeancesByFormationId(@PathVariable int formationId) {
        return seanceService.getSeancesByFormationId(formationId);
    }

}
