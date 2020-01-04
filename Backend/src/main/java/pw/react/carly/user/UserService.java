package pw.react.carly.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByLogin(String login) {
        List<User> users = userRepository.findByLogin(login);
        if(!users.isEmpty()) {
            return users.get(0);
        }
        throw new ResourceNotFoundException("User not found");
    }


    public User updateUser(User user){
        if(userRepository.existsById(user.getId())) {
            userRepository.save(user);
            return userRepository.save(user);
        }
        throw new ResourceNotFoundException("User not found");
    }

    public User deleteUser(User user){
        if(userRepository.existsById(user.getId())) {
            userRepository.delete(user);
            return user;
        }
        throw new ResourceNotFoundException("User not found");
    }

    public User getUser(Long id){
        if(userRepository.existsById(id)) {
            return userRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("User not found");
    }
}
