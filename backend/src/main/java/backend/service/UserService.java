package backend.service;

import java.util.List;

import backend.model.Item;
import backend.model.Users;
import backend.request.RegisterRequest;
import backend.response.RegisterResponse;

public interface UserService {

    RegisterResponse register(RegisterRequest request);
    boolean verifyOtp(String email, String otp);

    String generateToken(Users user);

    String registerToken(String email, String password);

    boolean isUserVerifed(String email, String password);

    Users findByEmail(String ownerEmail);

    void addToCart(Item item, String username);

    List<Item> getCart(String username);
    
    void addIem(Item item,String email);

    void removeItemFromCart(Item item, String username);

}
