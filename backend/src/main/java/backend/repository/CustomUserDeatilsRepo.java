package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.model.CustomUser;

@Repository
public interface CustomUserDeatilsRepo extends JpaRepository<CustomUser,Integer> {
    
    CustomUser findByUsername(String username);
}
