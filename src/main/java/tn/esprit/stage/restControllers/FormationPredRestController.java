package tn.esprit.stage.restControllers;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.FormationPredefinie;
import tn.esprit.stage.services.IServiceFormationPred;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/formation-predefinie")
@CrossOrigin(origins = "http://localhost:3000")
public class FormationPredRestController {

    @Autowired
    private IServiceFormationPred formationPredefinieService;

    @PostMapping("/add/{phaseId}")
    public ResponseEntity<FormationPredefinie> createFormationPredefinie(
            @RequestBody FormationPredefinie formationPredefinie,
            @PathVariable Integer phaseId) {
        FormationPredefinie created = formationPredefinieService.createFormationPredefinie(formationPredefinie, phaseId);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormationPredefinie> getFormationPredefinieById(@PathVariable Integer id) {
        FormationPredefinie formationPredefinie = formationPredefinieService.getFormationPredefinieById(id);
        return ResponseEntity.ok(formationPredefinie);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FormationPredefinie>> getAllFormationPredefinie() {
        List<FormationPredefinie> formationPredefinies = formationPredefinieService.getAllFormationPredefinie();
        return ResponseEntity.ok(formationPredefinies);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormationPredefinie> updateFormationPredefinie(
            @PathVariable Integer id,
            @RequestBody FormationPredefinie formationPredefinie) {
        FormationPredefinie updated = formationPredefinieService.updateFormationPredefinie(id, formationPredefinie);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormationPredefinie(@PathVariable Integer id) {
        formationPredefinieService.deleteFormationPredefinie(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/phases/{phaseId}/formationsPredefinies")
    public ResponseEntity<List<FormationPredefinie>> getFormationsPredefiniesByPhase(@PathVariable Integer phaseId) {
        List<FormationPredefinie> formationsPredefinies = formationPredefinieService.getFormationsPredefiniesByPhase(phaseId);
        return ResponseEntity.ok(formationsPredefinies);
    }

    @GetMapping("/tableau")
    public ResponseEntity<List<FormationPredefinie>> getAllFormationsPredefiniesWithDetails() {
        List<FormationPredefinie> formationsPredefinies = formationPredefinieService.getAllFormationsPredefiniesWithDetails();
        return new ResponseEntity<>(formationsPredefinies, HttpStatus.OK);
    }
}
