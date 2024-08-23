package tn.esprit.stage.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class FormationPredefinie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idFormationPred;
    public String typeFormation;
    public String propositionFormateur;

    @OneToMany(mappedBy = "formationPredefinie", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Formation> formations;

    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private Enseignant formateur;

    @ManyToOne
    @JoinColumn(name = "phase_id")
    private Phase phase;
}
