package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.dto.UserDto;
import com.example.backend.model.User;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISZTRÁCIÓ
    public void register(String username, String email, String password) {

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already in use");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // később BCrypt-tel titkosítjuk

        userRepository.save(user);
    }

    // LOGIN  RÉÉGI
    /*
    public boolean login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null) return false;

        return user.getPassword().equals(password); // később bcrypt!
    }
    */

    // MINDEN USER LISTÁZÁSA
    public List<User> getAll() {
        return userRepository.findAll();
    }

    // USER LEKÉRÉSE NÉV ALAPJÁN
    public User authenticate(String username, String password) {

        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return user;
    }

    //SIMA USER LEKÉRÉSE
    public User getByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return user;
    }

    public UserDto getUserDtoByUsername(String username) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }

}
