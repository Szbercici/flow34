package com.example.backend.Config;

import com.example.backend.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http
		.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
			
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/uploads/images/**").permitAll()
                        .requestMatchers("/images/**").permitAll()

                        // ADMIN ENGEDÉLY MINDENHEZ

                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // USERS:
                        // GET "/all"
                        // GET "/{username}"

                        // USERS ORDERS:
                        // GET "/users/orders" megkapod az összes létező rendelést
                        // GET "/users/{userId}/orders"

                        // PRODUCTS:
                        // POST "/products"
                        // PUT "/products"
                        // DELETE "/products"



                        // PRODUCTS
                        .requestMatchers(HttpMethod.GET, "/api/products", "/api/products/**").permitAll()

                        // USERS
                        .requestMatchers(HttpMethod.GET, "/api/users/me").hasAnyRole("USER","ADMIN")

                        // THEME CHANGE
                        .requestMatchers(HttpMethod.GET, "/api/users/me/**").hasAnyRole("USER","ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/users/me/**").hasAnyRole("USER","ADMIN")


                        // CART
                        .requestMatchers(HttpMethod.GET, "/api/cart/**").hasAnyRole("USER","ADMIN")

                        // MY ORDER
                        .requestMatchers(HttpMethod.GET, "/api/orders").hasAnyRole("USER","ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/orders").hasAnyRole("USER","ADMIN")

                        .anyRequest().authenticated()

                )
                // .headers(h -> h.frameOptions(f -> f.sameOrigin())) // h2-console miatt
                ;
        http.addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
                .httpBasic(b -> b.disable())
                .formLogin(f -> f.disable());
        ;


        return http.build();
    }

   @Bean
public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
    var config = new org.springframework.web.cors.CorsConfiguration();
    config.setAllowCredentials(true);
    config.setAllowedOriginPatterns(List.of(
            "http://localhost:5173",
            "http://51.20.12.185:5173"
    ));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setExposedHeaders(List.of("*"));

    var source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}


}
