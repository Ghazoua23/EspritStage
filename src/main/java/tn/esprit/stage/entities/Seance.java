package tn.esprit.stage.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Seance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idSeance;
    @Column(nullable = false)
    public LocalDateTime dateDebut;

    @Column(nullable = false)
    public LocalDateTime dateFin;

    @ManyToOne
    @JsonBackReference
    private Formation formation;

    @OneToMany(mappedBy = "seance", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Presence> presences;

    @ManyToOne
    @JoinColumn(name = "salle_id")
    private Salle salle;

    @ManyToOne
    @JoinColumn(name = "formateur_id")
    private Enseignant formateur;
}
