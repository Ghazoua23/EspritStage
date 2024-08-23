package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.entities.Salle;
import tn.esprit.stage.repositories.SalleRepository;
import tn.esprit.stage.services.IServiceBesoinF;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage.services.IServiceSalle;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/salles")
@CrossOrigin(origins = "http://localhost:3000")
public class SalleRestController {

    private IServiceSalle iServiceSalle;

    @PostMapping("/add/{enseignantId}")
    public Salle addSalle(@RequestBody Salle salle, @PathVariable int enseignantId) {
        return iServiceSalle.addSalle(salle, enseignantId);
    }

    @PutMapping("/update/{idSalle}")
    public Salle updateSalle(@RequestBody Salle salle, @PathVariable int idSalle) {
        return iServiceSalle.updateSalle(salle,idSalle);
    }

    @DeleteMapping("/delete/{salleId}")
    public void deleteSalle(@PathVariable int salleId) {
        iServiceSalle.deleteSalle(salleId);
    }

    @GetMapping("/get/{salleId}")
    public Salle getSalleById(@PathVariable int salleId) {
        return iServiceSalle.getSalleById(salleId);
    }

    @GetMapping("/all")
    public List<Salle> getAllSalles() {
        return iServiceSalle.getAllSalles();
    }


    @GetMapping("/available")
    public List<Salle> getAvailableSalles(@RequestParam("dateDebut") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateDebut,
                                          @RequestParam("dateFin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFin) {
        return iServiceSalle.getAvailableSalles(dateDebut, dateFin);
    }
}
