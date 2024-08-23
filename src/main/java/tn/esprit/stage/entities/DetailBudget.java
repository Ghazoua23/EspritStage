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
public class DetailBudget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    public int idDetailB;
    @Temporal(TemporalType.DATE)
    public Date dateDebut;
    @Temporal(TemporalType.DATE)
    public Date dateFin;
}
