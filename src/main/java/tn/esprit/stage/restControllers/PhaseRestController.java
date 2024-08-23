package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.Phase;
import tn.esprit.stage.services.IServicePhase;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/phases")
@CrossOrigin(origins = "http://localhost:3000")
public class PhaseRestController {

    @Autowired
    private IServicePhase servicePhase;

    @PostMapping("/add/{programmeFormationId}/{formateurId}")
    public ResponseEntity<Phase> addPhase(@RequestBody Phase phase, @PathVariable int programmeFormationId, @PathVariable int formateurId) {
        Phase createdPhase = servicePhase.createPhase(phase, programmeFormationId, formateurId);
        return new ResponseEntity<>(createdPhase, HttpStatus.CREATED);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Phase> getPhaseById(@PathVariable int id) {
        Phase phase = servicePhase.getPhaseById(id);
        return new ResponseEntity<>(phase, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Phase>> getAllPhases() {
        List<Phase> phases = servicePhase.getAllPhases();
        return new ResponseEntity<>(phases, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Phase> updatePhase(@PathVariable int id, @RequestBody Phase phase) {
        Phase updatedPhase = servicePhase.updatePhase(id, phase);
        return new ResponseEntity<>(updatedPhase, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePhase(@PathVariable int id) {
        servicePhase.deletePhase(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/programmeFormation/{programmeFormationId}")
    public ResponseEntity<List<Phase>> getPhasesByProgrammeFormation(@PathVariable int programmeFormationId) {
        List<Phase> phases = servicePhase.getPhasesByProgrammeFormation(programmeFormationId);
        return new ResponseEntity<>(phases, HttpStatus.OK);
    }
}
