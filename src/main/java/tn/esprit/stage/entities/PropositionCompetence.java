package tn.esprit.stage.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class PropositionCompetence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idPropositionC;

    @ManyToOne
    private BesoinFormation besoinFormation;

}
