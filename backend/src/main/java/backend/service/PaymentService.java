package backend.service;

import java.util.Map;

import backend.model.Payment;


public interface PaymentService {
    public String createOrder(Map<String,Object>data) throws Exception;
    public void savePayment(Payment payment) throws Exception;
}
