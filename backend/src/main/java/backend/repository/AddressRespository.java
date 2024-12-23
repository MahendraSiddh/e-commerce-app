package backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.model.Address;

@Repository
public interface AddressRespository extends JpaRepository<Address,UUID> {
    
}
