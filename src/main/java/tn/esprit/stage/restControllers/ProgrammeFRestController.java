package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.entities.ProgrammeFormation;
import tn.esprit.stage.entities.UserApp;
import tn.esprit.stage.repositories.UserRepository;
import tn.esprit.stage.services.IServiceProgrammeF;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/programmeFormation")
@CrossOrigin(origins = "http://localhost:3000")
public class ProgrammeFRestController {

    private IServiceProgrammeF iServiceProgrammeF;


    @PostMapping("/ajouterProgrammeF/{formateurId}")
    public ResponseEntity<ProgrammeFormation> createProgrammeFormation(@RequestBody ProgrammeFormation programmeFormation, @PathVariable int formateurId) {
        ProgrammeFormation createdProgrammeFormation = iServiceProgrammeF.createProgrammeFormation(programmeFormation, formateurId);
        return new ResponseEntity<>(createdProgrammeFormation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProgrammeFormation> updateProgrammeFormation(@PathVariable int id, @RequestBody ProgrammeFormation programmeFormation) {
        ProgrammeFormation updatedProgrammeFormation = iServiceProgrammeF.updateProgrammeFormation(id, programmeFormation);
        return new ResponseEntity<>(updatedProgrammeFormation, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgrammeFormation(@PathVariable int id) {
        iServiceProgrammeF.deleteProgrammeFormation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgrammeFormation> getProgrammeFormationById(@PathVariable int id) {
        ProgrammeFormation programmeFormation = iServiceProgrammeF.getProgrammeFormationById(id);
        return new ResponseEntity<>(programmeFormation, HttpStatus.OK);
    }

    @GetMapping("/afficher")
    public ResponseEntity<List<ProgrammeFormation>> getAllProgrammeFormations() {
        List<ProgrammeFormation> programmeFormations = iServiceProgrammeF.getAllProgrammeFormations();
        return new ResponseEntity<>(programmeFormations, HttpStatus.OK);
    }
}
