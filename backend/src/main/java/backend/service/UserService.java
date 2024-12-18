package backend.service;

import backend.model.Users;
import backend.request.RegisterRequest;
import backend.response.RegisterResponse;

public interface UserService {

    RegisterResponse register(RegisterRequest request);
    boolean verifyOtp(String email, String otp);

    String generateToken(Users user);

    String registerToken(String email, String password);

    boolean isUserVerifed(String email, String password);

}
