package backend.response;

import java.util.UUID;

import backend.model.Address;
import backend.model.PaymentStatus;
import backend.model.Users;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OrderResponse {
    private UUID id;
    private Users user;
    private Address address;

    private Integer amount;

    private PaymentStatus PaymentStatus;
}
