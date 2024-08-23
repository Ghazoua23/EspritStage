package tn.esprit.stage.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class PeriodeFormation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idPeriode;
    public String nomPeriode;

    @OneToMany(mappedBy = "periodeFormation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Formation> formations;

    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private Enseignant formateur;
}
