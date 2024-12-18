package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users,Integer> {
    
    Users findByUsername(String username);

    Users findByEmail(String email);
}
