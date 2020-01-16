package pw.react.carly.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class WrongDateSpanException extends RuntimeException {
    public WrongDateSpanException(){
        super("Provided wrong dates");
    }
}
