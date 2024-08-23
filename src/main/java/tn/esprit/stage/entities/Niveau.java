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
public class Niveau {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idNiveau;

    @OneToMany(mappedBy = "niveau", cascade = CascadeType.ALL)
    private Set<Savoir> savoirs;
}
