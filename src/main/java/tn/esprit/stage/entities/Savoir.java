package tn.esprit.stage.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Savoir {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idSavoir;
    public String type;

    @ManyToOne
    private Competence competence;

    @ManyToOne
    private Niveau niveau;


}
