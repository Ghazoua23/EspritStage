package tn.esprit.stage.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class UserApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idUserApp;
    public String userName;
    public String password;
    public String email;

}
