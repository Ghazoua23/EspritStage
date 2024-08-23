package tn.esprit.stage.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Competence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idCompetence;

    @ManyToMany(mappedBy = "competences")
    private Set<Formation> formations;

    @OneToMany(mappedBy = "competence", cascade = CascadeType.ALL)
    private Set<Savoir> savoirs;

    @ManyToOne
    private Domain domain;
}
