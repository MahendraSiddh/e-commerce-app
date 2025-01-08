package backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Address;
import backend.model.Item;
import backend.model.Order;
import backend.model.PaymentStatus;
import backend.model.Users;
import backend.repository.OrderRepository;
import backend.response.OrderResponse;
import backend.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    @Override
    public OrderResponse createOrder(Users user,Address address)
    {
        List<Item> items = new ArrayList<>();
        Integer totalAmount = 0;
        for(Item item:user.getCart())
        {
            items.add(item);
            totalAmount+=item.getCost();
        }
        Order order = Order.builder()
            .items(items)
            .user(user)
            .amount(totalAmount)
            .PaymentStatus(PaymentStatus.PENDING)
            .address(address)
            .build();
        
        orderRepository.save(order);

        OrderResponse orderResponse = OrderResponse.builder()
            .id(order.getId())
            .amount(order.getAmount())
            .address(order.getAddress())
            .PaymentStatus(order.getPaymentStatus())
            .build();
        return orderResponse;
    }

    @Override
    public void paymetStatusSuccess(UUID orderId){

        Order order = orderRepository.findById(orderId).orElse(null);

        if(order==null) 
        {
            System.out.println("Order is not their ");
        }
        else{
            order.setPaymentStatus(PaymentStatus.COMPLETED);
            orderRepository.save(order);
        }
    }
}
