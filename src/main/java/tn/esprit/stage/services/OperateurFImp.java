package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.OperatuerFormationRepository;

@Service
@AllArgsConstructor
public class OperateurFImp implements IServiceOperateurF{
    private OperatuerFormationRepository formationRepository;
}
