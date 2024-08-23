package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.PropositionCRepository;

@Service
@AllArgsConstructor
public class PropositionCImp implements IServicePropositionC{
    private PropositionCRepository propositionCRepository;
}
