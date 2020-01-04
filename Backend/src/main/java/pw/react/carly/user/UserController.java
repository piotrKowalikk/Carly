package pw.react.carly.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {


    private UserService userService;
    private UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(userService.getUser(id));
    }
    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok().body(userRepository.findAll());
    }

    @DeleteMapping("")
    public ResponseEntity deleteUser(@RequestBody @Valid User user){
        return ResponseEntity.ok().body(userService.deleteUser(user));
    }
    @PatchMapping("")
    public ResponseEntity<User> updateUser(@RequestBody @Valid User user){
        return ResponseEntity.ok().body(userService.updateUser(user));
    }
    @PutMapping(path = "")
    public ResponseEntity<User> updateWholeUser(@RequestBody @Valid User updatedUser) {
        return ResponseEntity.ok().body(userRepository.save(updatedUser));
    }

    @PostMapping("")
    public ResponseEntity<User> addUser(@RequestBody @Valid User user) {
            return ResponseEntity.ok().body(userRepository.save(user));
    }
    @GetMapping("/login/{login}")
    public ResponseEntity<User> getUserByLogin(@PathVariable String login){
        return ResponseEntity.ok().body(userService.findByLogin(login));

    }


}
