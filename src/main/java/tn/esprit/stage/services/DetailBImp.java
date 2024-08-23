package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.DetailBudgetRepository;

@Service
@AllArgsConstructor
public class DetailBImp implements IServiceDetailB{
    private DetailBudgetRepository detailBudgetRepository;
}
