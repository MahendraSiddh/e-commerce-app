package backend.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    @JsonBackReference
    private Users user;

    
    private String line1;

    private String line2;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    private String addressType;
    private boolean isPrimary;
    
}
