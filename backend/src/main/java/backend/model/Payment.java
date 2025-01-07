package backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "payment")

public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderId;
    private String mobileNumber;
    private String emailId;
    private BigDecimal amount;
    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime paymentDateTime;
    private String status;

}
