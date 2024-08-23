package tn.esprit.stage.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Enseignant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idEnseignant;
    public String nomEnseignant;
    public String prenomEnseignant;

    @Enumerated(EnumType.STRING)
    public Role role;

    @OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Presence> presencesEnregistrees;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Presence> presences;

    @OneToMany(mappedBy = "enseignant", cascade = CascadeType.ALL)
    private Set<EvaluationFormation> evaluationFormations;

    @OneToMany(mappedBy = "enseignant", cascade = CascadeType.ALL)
    private Set<EvaluationParticipant> evaluationParticipants;

    @OneToMany(mappedBy = "enseignant", cascade = CascadeType.ALL)
    private Set<BesoinFormation> besoinFormations;

    @OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL)
    @JsonIgnore //affichage
    private Set<Formation> formations;

    @OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL)
    private Set<PeriodeFormation> periodeFormations;

    @OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<ProgrammeFormation> programmeFormations;

    @OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Phase> phases;

    @ManyToMany(mappedBy = "participants")
    @JsonIgnore
    private Set<Formation> formationss;

    @OneToMany(mappedBy = "enseignant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Salle> salles;

    @OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Seance> seances;

    @Override
    public String toString() {
        return "Enseignant{idEnseignant=" + idEnseignant +
                ", nomEnseignant='" + nomEnseignant + '\'' +
                ", prenomEnseignant='" + prenomEnseignant + '\'' +
                ", role=" + role +
                '}';
    }

    // Constructeur qui accepte un ID
    public Enseignant(int idEnseignant) {
        this.idEnseignant = idEnseignant;
    }

    // Getters et setters
    public int getIdEnseignant() {
        return idEnseignant;
    }

    public void setIdEnseignant(int idEnseignant) {
        this.idEnseignant = idEnseignant;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.idEnseignant, this.nomEnseignant, this.prenomEnseignant, this.role); // Utilisez les champs simples
    }


}
