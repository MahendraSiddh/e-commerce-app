package backend.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddressRequest {
    private String line1;

    private String line2;
    private String city;
    private String state;
    private String country;
    private String postalCode;

    private String addressType;
    private boolean isPrimary;
}
