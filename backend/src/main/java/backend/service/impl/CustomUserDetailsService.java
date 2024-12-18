package backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import backend.model.Users;
import backend.repository.UsersRepository;
import backend.model.UserPrincipal;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UsersRepository usersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users customUser = usersRepo.findByUsername(username);
        if(customUser==null)
        {
            throw new UsernameNotFoundException("user not found");
        }
        else
        {
            return new UserPrincipal(customUser);
        }
    }
}
