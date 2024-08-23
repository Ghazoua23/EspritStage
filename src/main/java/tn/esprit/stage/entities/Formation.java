package tn.esprit.stage.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idFormation;
    public String type;
    public Etat etat;
    public String responsableFormation;
    public String organismeFormation;
    public Double cout;

    @Temporal(TemporalType.TIMESTAMP)
    public Date dateDebut;

    @Temporal(TemporalType.TIMESTAMP)
    public Date dateFin;

    @ManyToOne
    private FormationPredefinie formationPred;

    @ManyToOne
    private PeriodeFormation periodeFormation;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonIgnore
    @JsonManagedReference
    private List<Seance> seances;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    private Set<EvaluationFormation> evaluationFormations;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    private Set<EvaluationParticipant> evaluationParticipants;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    private Set<BesoinFormation> besoinFormations;

    @ManyToMany
    private Set<Competence> competences;

    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    //affichage
    private Enseignant formateur;

    @ManyToMany
    @JoinTable(
            name = "formation_participants",
            joinColumns = @JoinColumn(name = "formation_id"),
            inverseJoinColumns = @JoinColumn(name = "enseignant_id"))
    private Set<Enseignant> participants = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "formation_predefinie_id")
    private FormationPredefinie formationPredefinie;


    public Integer getId() {
        return idFormation;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.idFormation, this.type, this.etat, this.responsableFormation, this.organismeFormation, this.cout ,this.dateDebut, this.dateFin); // Utilisez les champs simples
    }



}
