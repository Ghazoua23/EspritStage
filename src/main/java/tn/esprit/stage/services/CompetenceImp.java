package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.CompetenceRepository;

@Service
@AllArgsConstructor
public class CompetenceImp implements IServiceCompetence{
    private CompetenceRepository competenceRepository;
}
