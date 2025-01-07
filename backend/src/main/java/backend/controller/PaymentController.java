package backend.controller;

import java.security.SignatureException;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.RazorpayException;

import backend.model.Payment;
import backend.service.OrderService;
import backend.service.PaymentService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;
    @PostMapping("/create_payment_order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        try{
            String response =  paymentService.createOrder(data);

            return new ResponseEntity<>(response,HttpStatus.CREATED);
        }catch(Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/payment")
    public ResponseEntity<?> createPayment(@RequestPart("payment") Payment payment,@RequestPart("orderId") String orderId) throws SignatureException {

        System.out.println("saving the payment ");
        try {
            System.out.println("order id is "+orderId);
            UUID id = UUID.fromString(orderId);
            orderService.paymetStatusSuccess(id);
            paymentService.savePayment(payment);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("error is"+e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
       
    }
}