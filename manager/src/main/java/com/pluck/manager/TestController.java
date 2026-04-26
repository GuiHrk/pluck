package com.pluck.manager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "API funcionando// servidor está online. Acesse:  http://localhost:8080 - e selecione o caminho de interesse";
    }
}