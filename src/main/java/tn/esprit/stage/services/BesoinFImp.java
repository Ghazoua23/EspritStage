package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.BesoinFormationRepository;

@Service
@AllArgsConstructor
public class BesoinFImp implements IServiceBesoinF{
    private BesoinFormationRepository besoinFormationRepository;
}
