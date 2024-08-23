package tn.esprit.stage.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class BesoinFormation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idBesoinF;
    @Temporal(TemporalType.DATE)
    public Date dateDebut;
    @Temporal(TemporalType.DATE)
    public Date dateFin;

    @ManyToOne
    private Enseignant enseignant;

    @ManyToOne
    private Formation formation;

    @OneToMany(mappedBy = "besoinFormation", cascade = CascadeType.ALL)
    private Set<PropositionCompetence> propositionCompetences;
}
