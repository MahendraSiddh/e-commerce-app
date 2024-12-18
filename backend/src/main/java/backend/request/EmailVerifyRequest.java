package backend.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmailVerifyRequest {
    private String email;
    private String password;
    private String otp;
}
