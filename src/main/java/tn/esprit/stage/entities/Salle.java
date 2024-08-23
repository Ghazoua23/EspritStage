package tn.esprit.stage.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Salle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idSalle;
    public String typeSalle;
    public int nbrPlace;
    public String equipements;
    public String projection;
    public String dispoClima;

    @ManyToOne
    @JoinColumn(name = "enseignant_id")
    private Enseignant enseignant;

    @OneToMany(mappedBy = "salle")
    @JsonIgnore
    private Set<Seance> seances;

    @Override
    public String toString() {
        return "Salle{idSalle=" + idSalle +
                ", typeSalle='" + typeSalle + '\'' +
                ", nbrPlace=" + nbrPlace +
                ", equipements='" + equipements + '\'' +
                ", projection='" + projection + '\'' +
                ", dispoClima='" + dispoClima + '\'' +
                '}';
    }


}
