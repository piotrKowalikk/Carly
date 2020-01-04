package pw.react.carly.jwt;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pw.react.carly.exceptions.UserNotFoundException;
import pw.react.carly.user.User;
import pw.react.carly.user.UserDTO;
import pw.react.carly.user.UserRepository;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository USerRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;



	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = USerRepository.findByEmail(email);
		if (user == null) {
			throw new UserNotFoundException(email);
		}
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				new ArrayList<>());
	}
	
	public User save(UserDTO user) {
		User newUser = new User();
		newUser.setEmail(user.getEmail());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return USerRepository.save(newUser);
	}
}