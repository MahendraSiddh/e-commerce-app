package backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class Users {
    
    
    private String username;
    private String password;

    @Id
    @Column(nullable = false, unique = true)
    private String email;
    private String userType;
    private String otp;
    private boolean verified;
}
