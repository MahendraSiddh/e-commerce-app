package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Address;
import backend.model.Users;
import backend.request.AddressRequest;
import backend.response.OrderResponse;
import backend.service.OrderService;
import backend.service.UserService;

@RestController
@RequestMapping("/api/v1")
public class OrderContoller {
    
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    @PostMapping("/create_order")
    public ResponseEntity<?> createOrder(@RequestPart("email") String email,@RequestPart("address") AddressRequest addressRequest)
    {
        Users user = userService.findByEmail(email);
        if(user!=null)
        {
           
            Address address = Address.builder()
                .line1(addressRequest.getLine1())
                .line2(addressRequest.getLine2())
                .city(addressRequest.getCity())
                .country(addressRequest.getCountry())
                .postalCode(addressRequest.getPostalCode())
                .user(user)
                .addressType(addressRequest.getAddressType())
                .isPrimary(addressRequest.isPrimary())
                .build();
              OrderResponse orderResponse = orderService.createOrder(user,address);
            return new ResponseEntity<>(orderResponse,HttpStatus.CREATED);
        }else{
            
            return new ResponseEntity<>("User not found",HttpStatus.BAD_REQUEST);
        }
    }
}
