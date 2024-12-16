package backend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    
    private String SECRECT_KEY = "06b058a08c633327a2c8e2af2952a09f7b39d3ad3d8ee396afae380151d5568839531a662bd806ab7913b85dcdca8df292fcfc36a7fb718634d39eecff0154138cfe782be52dfb530bb690974ec8b379ca3aa3f2f8ddc1f19d387e408e743f752147a652aedf7d86d8b4e46cc32a6b73fc0d9a46f9dcab0c8c5f0567cae0d3c4";
    Map<String,Object>claims = new HashMap<>();

    String generateToken(String username)
    {
        return Jwts.builder()
            .claims()
            .add(claims)
            .subject(username)
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis()+60*60*3000))
            .and()
            .signWith(getKey())
            .compact();
    }
    private SecretKey getKey()
    {
         byte[] keyBytes = Decoders.BASE64.decode(SECRECT_KEY);
         return Keys.hmacShaKeyFor(keyBytes);
    }
    public String extractUserName(String token) {
        return extractClaim(token,Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims,T> claimResolver)
    {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public Claims extractAllClaims(String token)
    {
        return Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
    }
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token)
    {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token)
    {
        return extractClaim(token,Claims::getExpiration);
    }
}
