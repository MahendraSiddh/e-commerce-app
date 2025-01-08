package backend.service;

import java.util.UUID;

import backend.model.Address;
import backend.model.Users;
import backend.response.OrderResponse;

public interface OrderService {
    
    public OrderResponse createOrder(Users user,Address address);

    public void paymetStatusSuccess(UUID orderId);
}
