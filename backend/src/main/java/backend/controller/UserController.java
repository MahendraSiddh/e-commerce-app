package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import backend.request.EmailVerifyRequest;
import backend.request.LoginRequest;
import backend.request.RegisterRequest;
import backend.response.RegisterResponse;
import backend.service.UserService;


@RestController
public class UserController {
    
    
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request)
    {
        System.out.println("Register request :");
        request.setPassword(encoder.encode(request.getPassword()));
        RegisterResponse response = userService.register(request);

        if(response==null || response.getEmail()=="")
        {
            return new ResponseEntity<>("Something went wrong", HttpStatus.FORBIDDEN);
        }else
        {
            return new ResponseEntity<>(response,HttpStatus.OK);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request)
    {
        String email = request.getEmail();
        String password = request.getPassword();
        Boolean verified = userService.isUserVerifed(email,password);

        //System.out.println("varification :"+verified);
        if(verified)
        {
            String token =  userService.registerToken(email,password);
            return new ResponseEntity<>(token,HttpStatus.OK);
        }else
        {
            return new ResponseEntity<>("Something went wrong ",HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/emailverify")
    public ResponseEntity<?> verifyUser(@RequestBody EmailVerifyRequest request){

        String email = request.getEmail();
        String password = request.getPassword();
        String otp = request.getOtp();
        boolean verified = false;
        System.out.println("email :"+email);
        System.out.println("password :"+password);
        System.out.println("otp :"+otp);
        try {
            verified = userService.verifyOtp(email, otp);
        }catch (RuntimeException e){
            System.err.println(e);
        }

        if(verified)
        {
            String token = userService.registerToken(email,password);
            return new ResponseEntity<>(token,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }

}
