package tn.esprit.stage.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Presence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idPresence;
    private boolean present;

    @ManyToOne
    @JoinColumn(name = "formateur_id")
    private Enseignant formateur;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Enseignant participant;

    @ManyToOne
    @JoinColumn(name = "seance_id")
    private Seance seance;
}
