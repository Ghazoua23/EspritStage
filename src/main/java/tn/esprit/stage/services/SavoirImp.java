package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.SavoirRepository;

@Service
@AllArgsConstructor
public class SavoirImp implements IServiceSavoir{
    private SavoirRepository savoirRepository;
}
