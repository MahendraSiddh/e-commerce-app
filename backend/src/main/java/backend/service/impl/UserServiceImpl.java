package backend.service.impl;


import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import backend.model.Item;
import backend.model.Users;
import backend.repository.UsersRepository;
import backend.request.RegisterRequest;
import backend.response.RegisterResponse;
import backend.service.EmailService;
import backend.service.JwtService;
import backend.service.UserService;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UsersRepository userRepository;
    
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    private EmailService emailService;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    
    

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        
       Users existingUser = userRepository.findByEmail(registerRequest.getEmail());
       if (existingUser != null && existingUser.isVerified() && existingUser.getPassword()!=registerRequest.getPassword()){
           return RegisterResponse.builder().build();
       }
        Users users = Users.builder()
                .username(registerRequest.getUserName())
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .role(registerRequest.getRole())
                .build();
        String otp = generateOTP();
        users.setOtp(otp);
        Users savedUser = userRepository.save(users);
        sendVerificationEmail(savedUser.getEmail(), otp);

        RegisterResponse response = RegisterResponse.builder()
                .username(users.getUsername())
                .email(users.getEmail())
                .build();
        return response;
    }

    
    public boolean verifyOtp(String email, String otp) {
        Users users = userRepository.findByEmail(email);
        if (users == null){
            return false;
        } else if (users.isVerified()) {
            return false;
        } else if (otp.equals(users.getOtp())) {
            users.setVerified(true);
            userRepository.save(users);
            return true;
        }else {
            return false;
        }
    }


    private String generateOTP(){
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private void sendVerificationEmail(String email,String otp){
        String subject = "Email verification";
        String body ="your verification otp is: "+otp;
        emailService.sendEmail(email,subject,body);
    }


    //Jwt token 
    @Override
    public String registerToken(String email,String password) {

        Users savedUser = userRepository.findByEmail(email);
            Users user = Users.builder()
            .username(savedUser.getUsername())
            .password(password)
            .email(savedUser.getEmail())
            .role(savedUser.getRole())
            .verified(savedUser.isVerified())
            .otp(savedUser.getOtp())
            .build();
            String token = generateToken(user);
            //System.out.println("token is "+token);
            return token;
    }

    @Override
    public String generateToken(Users user)
    {
        Authentication authentication = authManager
                        .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        Boolean isAuthencticated = authentication.isAuthenticated();

        //System.out.println("auth is :");
        if(isAuthencticated)
        {
            return jwtService.generateToken(user.getUsername(),user.getRole());
        }else return "failed";
    }

    @Override
    public boolean isUserVerifed(String email, String password)
    {
        Users savedUser = userRepository.findByEmail(email);

        if(savedUser==null || !savedUser.isVerified() || !encoder.matches(password, savedUser.getPassword() ))
        {
            return false;
        }
        else{
            return true;
        }
    }


    @Override
    public Users findByEmail(String email) {
        System.out.println("email is"+email);
        Users user = userRepository.findByEmail(email);
        System.out.println("user is "+user);
        return user;
    }


    @Override
    public void addToCart(Item item, String username) {
        
        Users user = userRepository.findByUsername(username);

        user.getCart().add(item);
        userRepository.save(user);
    }


    @Override
    public List<Item> getCart(String username) {
        Users user = userRepository.findByUsername(username);
        List<Item> cart = user.getCart();
        return cart;
    }


    @Override
    public void addIem(Item item,String email) {
       Users user = userRepository.findByEmail(email);

       user.getItems().add(item);

       userRepository.save(user);
    }

    @Override
    public void removeItemFromCart(Item item, String username){

        Users user = userRepository.findByUsername(username);
        user.getCart().remove(item);
        userRepository.save(user);
    }
    
}