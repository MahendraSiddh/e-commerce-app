package backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import backend.model.CustomUser;
import backend.repository.CustomUserDeatilsRepo;


@Service
public class CustomUserService {
    @Autowired
    CustomUserDeatilsRepo userRepo;
    
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JwtService jwtService;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    public CustomUser register(CustomUser user)
    {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
    public String verify(CustomUser user)
    {
        Authentication authentication = authManager
                        .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        Boolean isAuthencticated = authentication.isAuthenticated();
        if(isAuthencticated)
        {
            return jwtService.generateToken(user.getUsername());
        }else return "failed";
    }
}
