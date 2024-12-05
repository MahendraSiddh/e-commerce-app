package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.model.CustomUser;
import backend.service.CustomUserService;

@RestController
public class UserController {
    
    @Autowired
    CustomUserService userService;

    @PostMapping("/register")
    public CustomUser registor(@RequestBody CustomUser user)
    {
        return userService.register(user);
    }
}
