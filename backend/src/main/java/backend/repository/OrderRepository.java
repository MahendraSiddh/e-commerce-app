package backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.model.Order;


@Repository
public interface OrderRepository extends JpaRepository<Order,UUID> {
   
    @SuppressWarnings("null")
    Optional<Order> findById(UUID orderId);
}
