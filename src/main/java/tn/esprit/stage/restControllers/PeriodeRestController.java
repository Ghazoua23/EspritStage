package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.PeriodeFormation;
import tn.esprit.stage.services.IServicePeriode;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/periodeFormation")
@CrossOrigin(origins = "http://localhost:3000")
public class PeriodeRestController {

    @Autowired
    private IServicePeriode periodeService;

    @PostMapping
    public ResponseEntity<PeriodeFormation> addPeriodeFormation(@RequestBody PeriodeFormation periodeFormation) {
        PeriodeFormation savedPeriodeFormation = periodeService.ajouterPeriodeFormation(periodeFormation);
        return new ResponseEntity<>(savedPeriodeFormation, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PeriodeFormation> getPeriodeFormationById(@PathVariable int id) {
        Optional<PeriodeFormation> periodeFormation = periodeService.getPeriodeFormationById(id);
        return periodeFormation.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<PeriodeFormation>> getAllPeriodesFormation() {
        List<PeriodeFormation> periodes = periodeService.getAllPeriodesFormation();
        return ResponseEntity.ok(periodes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PeriodeFormation> updatePeriodeFormation(@PathVariable int id, @RequestBody PeriodeFormation updatedPeriodeFormation) {
        PeriodeFormation updated = periodeService.updatePeriodeFormation(id, updatedPeriodeFormation);

        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePeriodeFormation(@PathVariable int id) {
        periodeService.deletePeriodeFormation(id);
        return ResponseEntity.noContent().build();
    }

}
