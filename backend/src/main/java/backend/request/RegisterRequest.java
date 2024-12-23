package backend.request;

import backend.model.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class RegisterRequest {
    private String userName;
    private String email;
    private String password;
    private Role role;
}