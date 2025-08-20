import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

public class JwtKeyGenerator {
    public static void main(String[] args) {
        // This method generates a key that is GUARANTEED to be secure enough for HS512 (at least 512 bits / 64 bytes).
        String secureKey = Encoders.BASE64.encode(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded());
        System.out.println("--- START OF GENERATED JWT SECRET KEY (COPY EVERYTHING BELOW THIS LINE) ---");
        System.out.println(secureKey); // Print the full key
        System.out.println("--- END OF GENERATED JWT SECRET KEY (COPY EVERYTHING ABOVE THIS LINE) ---");
        System.out.println("Key Length (characters): " + secureKey.length());
        System.out.println("Base64 Decoded Bytes Length (should be >= 64): " + Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded().length);
    }
}
