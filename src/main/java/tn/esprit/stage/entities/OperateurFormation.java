package tn.esprit.stage.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class OperateurFormation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idOperateurF;
}
