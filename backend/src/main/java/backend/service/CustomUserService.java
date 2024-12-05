package backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import backend.model.CustomUser;
import backend.repository.CustomUserDeatilsRepo;


@Service
public class CustomUserService {
    @Autowired
    CustomUserDeatilsRepo userRepo;
    
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    public CustomUser register(CustomUser user)
    {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
}
