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

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class ProgrammeFormation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idProgrammeF;
    public String nomProgramme;

    @OneToMany(mappedBy = "programmeFormation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Phase> phases;

    @ManyToOne
    private Enseignant formateur;

    public Integer getId() {
        return idProgrammeF;
    }

    public void addPhase(Phase phase) {
        this.phases.add(phase);
        phase.setProgrammeFormation(this);
    }

    public void removePhase(Phase phase) {
        this.phases.remove(phase);
        phase.setProgrammeFormation(null);
    }


}
