package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceDetailB;

@RestController
@AllArgsConstructor
public class DetailBRestController {
    private IServiceDetailB iServiceDetailB;
}
