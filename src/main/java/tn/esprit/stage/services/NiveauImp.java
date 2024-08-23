package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.NiveauRepository;

@Service
@AllArgsConstructor
public class NiveauImp implements IServiceNiveau{
    private NiveauRepository niveauRepository;
}
