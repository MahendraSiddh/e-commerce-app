package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.service.CustomUserDetailsService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class HomeController {
    
    @Autowired
    CustomUserDetailsService customUserDetailsService;
    @GetMapping("/home")
    public String getHome(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse)
    {
        return "You have api acsess";
    }
    
}
