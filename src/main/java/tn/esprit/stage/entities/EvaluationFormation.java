package tn.esprit.stage.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class EvaluationFormation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idEvaluationF;
    @Temporal(TemporalType.DATE)
    public Date date;

    @ManyToOne
    private Formation formation;

    @ManyToOne
    private Enseignant enseignant;
}
