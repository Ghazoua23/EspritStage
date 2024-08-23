package tn.esprit.stage.services;

import tn.esprit.stage.entities.Salle;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface IServiceSalle {

    Salle addSalle(Salle salle, int enseignantId);
    Salle updateSalle(Salle salle, int idSalle);
    void deleteSalle(int salleId);
    Salle getSalleById(int salleId);
    List<Salle> getAllSalles();

    public List<Salle> getAvailableSalles(LocalDateTime dateDebut, LocalDateTime dateFin);
}
