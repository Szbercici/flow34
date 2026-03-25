package com.example.backend.service;

import com.example.backend.dto.UpdateEmailResponse;
import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.model.Theme;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Long getUserId(Authentication auth) {
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username))
                .getId();
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
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);
    }

    // MINDEN USER LISTÁZÁSA
    public List<User> getAll() {
        return userRepository.findAll();
    }

    // USER LEKÉRÉSE NÉV ALAPJÁN (login)
    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return user;
    }

    // SIMA USER LEKÉRÉSE
    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public UserDto getMe(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return new UserDto(user.getId(), user.getUsername(), user.getEmail());
    }

    public UserDto getUserDtoByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + username));

        return new UserDto(user.getId(), user.getUsername(), user.getEmail());
    }

    //THEME ÁLLÍTÁSA
    @Transactional(readOnly = true)
    public String getMyTheme(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getTheme()
                .name(); // "light" / "dark"
    }

    @Transactional
    public String updateMyTheme(Long userId, String themeRaw) {
        if (themeRaw == null) throw new IllegalArgumentException("theme is required");

        Theme theme;
        try {
            theme = Theme.valueOf(themeRaw.trim().toLowerCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("theme must be 'light' or 'dark'");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setTheme(theme);
        userRepository.save(user);

        return user.getTheme().name();
    }

    @Transactional
    public UpdateEmailResponse updateEmail(Long userId, String newEmail) {
        if (newEmail == null || newEmail.isBlank() || !newEmail.contains("@")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (userRepository.existsByEmail(newEmail) && !newEmail.equals(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use");
        }

        user.setEmail(newEmail);
        User savedUser = userRepository.save(user);

        return new UpdateEmailResponse(true, savedUser.getEmail());
    }


}
