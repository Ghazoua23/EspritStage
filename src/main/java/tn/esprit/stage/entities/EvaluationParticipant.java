package tn.esprit.stage.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class EvaluationParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idEvaluationP;
    public int note;

    @ManyToOne
    private Formation formation;

    @ManyToOne
    private Enseignant enseignant;
}
