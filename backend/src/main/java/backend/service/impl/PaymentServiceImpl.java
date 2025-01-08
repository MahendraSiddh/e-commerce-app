package backend.service.impl;

import java.time.LocalDateTime;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import backend.model.Payment;
import backend.repository.PaymentRepository;
import backend.service.PaymentService;
import backend.utility.Signature;

@Service
public class PaymentServiceImpl implements PaymentService {

    //private static final String RAZORPAY_KEY = "rzp_test_eDsOsv7EhvfzGB";
    private static final String RAZORPAY_SECRET = "mY0GOFzxlTn5SnraCDoqzADY";

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    private RazorpayClient razorpayClient;

    @Override
    public String createOrder(Map<String, Object> data) throws Exception {
        int amount = Integer.parseInt(data.get("amount").toString());

        JSONObject ob = new JSONObject();
        ob.put("amount", amount*100);
        ob.put("currency", "INR");
        ob.put("receipt", "rec_1234");

        Order order = null;
        try{
            order = razorpayClient.orders.create(ob);
            return order.toString();
        }catch(RazorpayException e)
        {
            System.err.println(e);
            return null;
        }
        
    }

    @Override
    public void savePayment(Payment payment) throws Exception {
        String generatedSignature = Signature.calculateRFC2104HMAC(payment.getRazorpayOrderId() + "|" +payment.getRazorpayPaymentId(), RAZORPAY_SECRET);
        if(payment.getRazorpaySignature().equals(generatedSignature)) {
            payment.setPaymentDateTime(LocalDateTime.now());
        }else throw new Exception("Error while saving the payment");
    }
    
}

