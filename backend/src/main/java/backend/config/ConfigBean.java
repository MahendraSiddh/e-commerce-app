package backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Configuration
public class ConfigBean {

    @Value("rzp_test_eDsOsv7EhvfzGB")
    private String key;
    @Value("mY0GOFzxlTn5SnraCDoqzADY")
    private String secret;
    @Bean
    public RazorpayClient getRazorpayClient(){
        try {
            return new RazorpayClient(key, secret);
        } catch (RazorpayException e) {
            System.out.println("Unable to create client for razorpay");
            throw new RuntimeException("Failed to instantiate razorpay");
        }
    }
}

