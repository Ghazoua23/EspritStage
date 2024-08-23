package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.DomainRepository;

@Service
@AllArgsConstructor
public class DomainImp implements IServiceDomain{
    private DomainRepository domainRepository;
}
