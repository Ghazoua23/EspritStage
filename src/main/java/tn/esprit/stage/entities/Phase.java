package tn.esprit.stage.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Phase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idPhase;
    public String nomPhase;
    public String description;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "programme_formation_id")
    private ProgrammeFormation programmeFormation;

    @OneToMany(mappedBy = "phase", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<FormationPredefinie> formationPredefinies;

    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private Enseignant formateur;
}
