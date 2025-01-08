package backend.model;

public enum PaymentStatus {
    PENDING,       // Payment is initiated but not completed
    COMPLETED,     // Payment is successfully completed
    FAILED,        // Payment has failed
    REFUNDED;      // Payment has been refunded
}
