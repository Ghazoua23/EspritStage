package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.Enseignant;
import tn.esprit.stage.services.EnseignantImp;
import tn.esprit.stage.services.IServiceEnseignant;
import tn.esprit.stage.services.IServiceFormation;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/enseignants")
@CrossOrigin(origins = "http://localhost:3000")
public class EnseignantRestController {

    @Autowired
    private IServiceEnseignant iServiceEnseignant;

    @PostMapping
    public ResponseEntity<Enseignant> createEnseignant(@RequestBody Enseignant enseignant) {
        Enseignant created = iServiceEnseignant.createEnseignant(enseignant);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enseignant> getEnseignantById(@PathVariable Integer id) {
        Enseignant enseignant = iServiceEnseignant.getEnseignantById(id)
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé avec l'ID : " + id));
        return ResponseEntity.ok(enseignant);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Enseignant> updateEnseignant(@PathVariable Integer id, @RequestBody Enseignant enseignant) {
        Enseignant updated = iServiceEnseignant.updateEnseignant(id, enseignant);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnseignant(@PathVariable Integer id) {
        iServiceEnseignant.deleteEnseignant(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Enseignant>> getAllEnseignants() {
        List<Enseignant> enseignants = iServiceEnseignant.getAllEnseignants();
        return ResponseEntity.ok(enseignants);
    }
}
