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
public class Domain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idDomain;

    @OneToMany(mappedBy = "domain", cascade = CascadeType.ALL)
    private Set<Competence> competences;
}
