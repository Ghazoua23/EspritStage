package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceOperateurF;

@RestController
@AllArgsConstructor
public class OperateurFRestController {
    private IServiceOperateurF iServiceOperateurF;
}
