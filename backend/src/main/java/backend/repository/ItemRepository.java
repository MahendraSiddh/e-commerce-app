package backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    
    Optional<Item> findById(Long id);

    List<Item> findAll();
}

